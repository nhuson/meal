import BaseService from './base.service'
import createError from 'http-errors'
import MealModel from '../models/meal.model'
import UserModel from '../models/user.model'

class MealService extends BaseService {
	constructor() {
		super()
		this.model = MealModel
	}

	async getIngredientByMealId(option) {
		const data = await this.model
			.findOne({ _id: option.id }, ['ingredients'])
			.populate('ingredients.ingredient')

		return data.ingredients.map((result) => ({
			id: result.ingredient._id,
			amount: result.amount,
		}))
	}

	async addFavorite(data) {
		const favorites = await UserModel.findOne({ _id: data.user_id }).and({
			meal_favorites: data.meal_id,
		})
		if (favorites) {
			throw createError(422, 'Meal added to favorite!')
		}

		return await UserModel.findOneAndUpdate(
			{ _id: data.user_id },
			{ $push: { meal_favorites: data.meal_id } },
		)
	}

	async removeFavorite(data) {
		const favorites = await UserModel.findOne({ _id: data.user_id }).and({
			meal_favorites: data.meal_id,
		})
		if (!favorites) {
			throw createError(422, 'Meal havent been favorite!')
		}

		return await UserModel.findOneAndUpdate(
			{ _id: data.user_id },
			{ $pull: { meal_favorites: data.meal_id } },
		)
	}

	async getMealFavoriteByUser(option) {
		let { page, per_page, user_id } = option
		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}
		let offset = (page - 1) * per_page
		let totalRecord = await UserModel.findOne({ _id: user_id }, ['meal_favorites'])
		if (!totalRecord || totalRecord.meal_favorites.length === 0) {
			return []
		}
		totalRecord = totalRecord.meal_favorites.length
		let totalPage = Math.ceil(totalRecord / per_page)
		let results = await UserModel.findOne({ _id: user_id }, [
			'meal_favorites',
		]).populate([
			{
				path: 'meal_favorites',
				model: 'meals',
				options: {
					skip: offset,
					limit: per_page,
				},
			},
		])

		results = results.meal_favorites.map((meal) => ({
			meal_id: meal._id,
			meal_title: meal.title,
			meal_image: meal.image,
			is_pro: meal.is_pro,
			created_at: meal.created_at,
		}))

		return {
			results,
			total_page: totalPage,
			total_record: totalRecord,
		}
	}

	/**
	 * Create meal calendar by user
	 */
	async createMealCalendar(data) {
		const date = new Date(data.date).getTime() / 1000
		return this.db.transaction(async (trx) => {
			try {
				for (let mealId of data.ids) {
					await trx
						.insert({
							meal_id: mealId,
							user_id: data.user_id,
							date,
						})
						.into('calendar_meals')
				}
				await trx.commit()
			} catch (err) {
				console.log(err, '===')
				trx.rollback()
				throw createError(422, err)
			}
		})
	}

	async getMealByDay(data) {
		const date = new Date(data.date).getTime() / 1000
		let mealIds = await this.db
			.select('meal_id')
			.where({ date, user_id: data.user_id })
			.from('calendar_meals')
			.orderBy('created_at', 'desc')
		mealIds = mealIds.map((mealId) => mealId.meal_id)
		let result = await this.db
			.whereIn('id', mealIds)
			.from('meals')
			.orderBy('created_at', 'desc')
		return result.map((meal) => ({
			...meal,
			date: data.date,
		}))
	}

	async getMealByUserId(data) {
		let { page, per_page, user_id } = data
		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}
		let totalRecord = await this.db
			.where({ user_id })
			.from('calendar_meals')
			.count('id as total')
		if (totalRecord[0].total <= 0) {
			return []
		}
		let totalPage = Math.ceil(totalRecord[0].total / per_page)
		if (page > totalPage) {
			page = totalPage
		}
		if (page === 0) {
			page = 1
		}
		let offset = (page - 1) * per_page

		const result = await this.db
			.select(
				'meals.id as meal_id',
				'meals.title as meal_title',
				'meals.image as meal_image',
				'meals.is_pro as meal_is_pro',
				'meals.created_at as created_at',
				'meals.updated_at as updated_at',
				'calendar_meals.date as date',
			)
			.from('calendar_meals')
			.innerJoin('meals', function() {
				this.on('meals.id', '=', 'calendar_meals.meal_id')
			})
			.where({ user_id })
			.limit(per_page)
			.offset(offset)
			.orderBy('created_at', 'desc')
		return result.map((meal) => ({
			...meal,
			date: moment(meal.date * 1000).format('YYYY-MM-DD'),
		}))
	}

	async getMealRangeDay(data) {
		let { page, per_page, user_id } = data
		const from = new Date(data.from).getTime() / 1000
		const to = new Date(data.to).getTime() / 1000
		if (from > to) {
			throw createError(400, 'Invalid date selected!')
		}
		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}
		let totalRecord = await this.db
			.where({ user_id })
			.where('calendar_meals.date', '>=', from)
			.where('calendar_meals.date', '<=', to)
			.from('calendar_meals')
			.count('id as total')
		if (totalRecord[0].total <= 0) {
			return []
		}
		let totalPage = Math.ceil(totalRecord[0].total / per_page)
		if (page > totalPage) {
			page = totalPage
		}
		if (page === 0) {
			page = 1
		}
		let offset = (page - 1) * per_page

		const result = await this.db
			.select(
				'meals.id as meal_id',
				'meals.title as meal_title',
				'meals.image as meal_image',
				'meals.is_pro as meal_is_pro',
				'meals.created_at as created_at',
				'meals.updated_at as updated_at',
				'calendar_meals.date as date',
			)
			.from('calendar_meals')
			.innerJoin('meals', function() {
				this.on('meals.id', '=', 'calendar_meals.meal_id')
			})
			.where({ user_id })
			.where('calendar_meals.date', '>=', from)
			.where('calendar_meals.date', '<=', to)
			.limit(per_page)
			.offset(offset)
			.orderBy('created_at', 'desc')
		return result.map((meal) => ({
			...meal,
			date: moment(meal.date * 1000).format('YYYY-MM-DD'),
		}))
	}
}

export default new MealService()

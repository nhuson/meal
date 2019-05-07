import mongoose from 'mongoose'
import BaseService from './base.service'
import createError from 'http-errors'
import MealModel from '../models/meal.model'
import UserModel from '../models/user.model'
import { flattenDeep } from 'lodash'

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
			amount: result.amount
		}))
	}

	async addFavorite(data) {
		const favorites = await UserModel.findOne({ _id: data.user_id }).and({
			meal_favorites: data.meal_id
		})
		if (favorites) {
			throw createError(422, 'Meal added to favorite!')
		}

		return await UserModel.findOneAndUpdate(
			{ _id: data.user_id },
			{ $push: { meal_favorites: data.meal_id } }
		)
	}

	async removeFavorite(data) {
		const favorites = await UserModel.findOne({ _id: data.user_id }).and({
			meal_favorites: data.meal_id
		})
		if (!favorites) {
			throw createError(422, 'Meal havent been favorite!')
		}

		return await UserModel.findOneAndUpdate(
			{ _id: data.user_id },
			{ $pull: { meal_favorites: data.meal_id } }
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
			'meal_favorites'
		]).populate([
			{
				path: 'meal_favorites',
				model: 'meals',
				options: {
					skip: offset,
					limit: per_page
				}
			}
		])

		results = results.meal_favorites.map((meal) => ({
			meal_id: meal._id,
			meal_title: meal.title,
			meal_image: meal.image,
			is_pro: meal.is_pro,
			created_at: meal.created_at
		}))

		return {
			results,
			total_page: totalPage,
			total_record: totalRecord
		}
	}

	async _findMealPlanByDay(data) {
		return UserModel.aggregate()
			.match({
				_id: mongoose.Types.ObjectId(data.user_id)
			})
			.project({
				meal_plans: {
					$filter: {
						input: '$meal_plans',
						as: 'meal_plan',
						cond: { $eq: ['$$meal_plan.date', data.date] }
					}
				}
			})
			.lookup({
				from: 'meals',
				localField: 'meal_plans.meals.meal',
				foreignField: '_id',
				as: 'meal_plans'
			})
	}

	/**
	 * Create meal calendar by user
	 */
	async createMealPlan(data) {
		const mealPlans = {
			date: data.date,
			meals: data.ids.map((meal) => ({ meal }))
		}
		const mealPlan = await this._findMealPlanByDay(data)
		if (mealPlan[0].meal_plans.length > 0) {
			await UserModel.findOneAndUpdate(
				{ _id: data.user_id },
				{ $pull: { meal_plans: { date: data.date } } }
			)
		}

		return UserModel.findOneAndUpdate(
			{ _id: data.user_id },
			{ $push: { meal_plans: mealPlans } }
		)
	}

	async editMealPlan(data) {
		const mealPlans = {
			date: data.date,
			meals: data.ids.map((meal) => ({ meal: meal.id, status: meal.status }))
		}
		await UserModel.findOneAndUpdate(
			{ _id: data.user_id },
			{ $pull: { meal_plans: { date: data.date } } }
		)

		return UserModel.findOneAndUpdate(
			{ _id: data.user_id },
			{ $push: { meal_plans: mealPlans } }
		)
	}

	async getMealPlanByDay(data) {
		let results = await this._findMealPlanByDay(data)
		results = results.map((result) => {
			return result.meal_plans.map((meal) => ({
				id: meal._id,
				title: meal.title,
				serving: meal.serving,
				calorie: meal.calorie,
				image: meal.image,
				time: meal.time
			}))
		})
		return flattenDeep(results)
	}

	async getMealByUserId(data) {
		let { page, per_page, user_id } = data
		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}

		let totalRecord = await UserModel.findOne({ _id: user_id }, ['meal_plans'])
		totalRecord = totalRecord.meal_plans.length
		if (totalRecord <= 0) {
			return []
		}
		let totalPage = Math.ceil(totalRecord / per_page)
		if (page > totalPage) {
			page = totalPage
		}
		if (page === 0) {
			page = 1
		}
		let offset = (page - 1) * per_page
		let results = await UserModel.findOne({ _id: user_id }, ['meal_plans']).populate([
			{
				path: 'meal_plans',
				model: 'meals',
				select: '_id title image',
				options: {
					skip: offset,
					limit: per_page
				}
			}
		])
		return results
		// const result = await this.db
		// 	.select(
		// 		'meals.id as meal_id',
		// 		'meals.title as meal_title',
		// 		'meals.image as meal_image',
		// 		'meals.is_pro as meal_is_pro',
		// 		'meals.created_at as created_at',
		// 		'meals.updated_at as updated_at',
		// 		'calendar_meals.date as date'
		// 	)
		// 	.from('calendar_meals')
		// 	.innerJoin('meals', function() {
		// 		this.on('meals.id', '=', 'calendar_meals.meal_id')
		// 	})
		// 	.where({ user_id })
		// 	.limit(per_page)
		// 	.offset(offset)
		// 	.orderBy('created_at', 'desc')
		// return result.map((meal) => ({
		// 	...meal,
		// 	date: moment(meal.date * 1000).format('YYYY-MM-DD')
		// }))
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
				'calendar_meals.date as date'
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
			date: moment(meal.date * 1000).format('YYYY-MM-DD')
		}))
	}
}

export default new MealService()

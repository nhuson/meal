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
}

export default new MealService()

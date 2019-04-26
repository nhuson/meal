import BaseService from './base.service'
import createError from 'http-errors'

class MealService extends BaseService {
	constructor() {
		super()
		this.tableName = 'meals'
	}

	async getMeals(option) {
		let { page, per_page } = option
		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}
		let totalRecord = await this.db.from(this.tableName).count('id as total')
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
		let meals = await this.db
			.select(
				'meals.id as meal_id',
				'meals.title as meal_title',
				'meals.instruction as instruction',
				'meals.description as meal_description',
				'meals.image as meal_image',
				'meals.time as meal_time',
				'meals.serving as meal_serving',
				'meals.calorie as meal_calorie',
				'meals.count_rate as meal_count_rate',
				'meals.rate as meal_rate',
				'meals.album as meal_album',
				'meals.is_pro as meal_is_pro',
				'meals.created_at as created_at',
				'meals.updated_at as updated_at',
				'categories.id as cate_id',
				'categories.title as category_title',
				'categories.description as category_description',
				'allergi_types.id as allergi_type_id',
				'allergi_types.title as allergi_type_title',
				'allergi_types.description as allergi_type_description',
				'menu_types.id as menu_type_id',
				'menu_types.title as menu_type_title',
				'menu_types.description as menu_type_description',
			)
			.from(this.tableName)
			.innerJoin('categories', function() {
				this.on('categories.id', '=', 'meals.cate_id')
			})
			.innerJoin('allergi_types', function() {
				this.on('allergi_types.id', '=', 'meals.allergi_id')
			})
			.innerJoin('menu_types', function() {
				this.on('menu_types.id', '=', 'meals.menu_id')
			})
			.limit(per_page)
			.offset(offset)
			.orderBy('created_at', 'desc')
		meals.forEach((meal) => {
			// meal.instruction = JSON.parse(meal.instruction)
			meal.meal_album = JSON.parse(meal.meal_album)
			if (meal.meal_count_rate > 0) {
				meal.rate_score = parseFloat(
					(meal.meal_rate / meal.meal_count_rate).toFixed(2),
				)
			}
		})
		return {
			meals,
			total_page: totalPage,
			total_record: totalRecord[0].total,
		}
	}

	async create(data) {
		let ingredientIds = data.ingredient_id
		delete data.ingredient_id
		return this.db.transaction(async (trx) => {
			try {
				let mealId = await trx
					.insert(data)
					.returning('id')
					.into(this.tableName)
				for (let ingredient of ingredientIds) {
					await trx
						.insert({
							meal_id: mealId[0],
							ingre_id: ingredient.id,
							amount: ingredient.amount,
						})
						.into('meal_ingredients')
				}
				await trx.commit()
			} catch (err) {
				trx.rollback()
				throw createError(422, err)
			}
		})
	}

	async update(data, option) {
		let ingredientIds = data.ingredient_id
		delete data.ingredient_id

		this.update(data, option)
		if (!ingredientIds) {
			return
		}

		return this.db.transaction(async (trx) => {
			try {
				for (let ingredient of ingredientIds) {
					await trx
						.where({ meal_id: option.id })
						.update({ ingre_id: ingredient.id, amount: ingredient.amount })
						.into('meal_ingredients')
				}
				await trx.commit()
			} catch (err) {
				trx.rollback()
				throw createError(422, err)
			}
		})
	}

	async delete(option) {
		try {
		} catch (err) {
			trx.rollback()
			throw createError(422, err)
		}
	}

	async getIngredientByMealId(option) {
		const ingredients = await this.db
			.where({ meal_id: option.id })
			.from('meal_ingredients')

		return ingredients.map((ingredient) => ({
			id: ingredient.ingre_id,
			amount: ingredient.amount,
		}))
	}

	async addFavorite(data) {
		const favorites = await this.db
			.where({ user_id: data.user_id, meal_id: data.meal_id })
			.from('user_meal_favorite')
			.first()
		if (favorites) {
			throw createError(422, 'Meal added to favorite!')
		}
		return await this.db.insert(data).into('user_meal_favorite')
	}

	async removeFavorite(data) {
		const favorites = await this.db
			.where({ user_id: data.user_id, meal_id: data.meal_id })
			.from('user_meal_favorite')
			.first()
		if (!favorites) {
			throw createError(422, 'Meal havent been favorite!')
		}
		return await this.db
			.table('user_meal_favorite')
			.where({ user_id: data.user_id, meal_id: data.meal_id })
			.delete()
	}

	async getMealFavoriteByUser(option) {
		let { page, per_page, user_id } = option
		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}
		let totalRecord = await this.db
			.from('user_meal_favorite')
			.where({ user_id })
			.count('id as total')
		if (totalRecord[0].total <= 0) {
			return []
		}
		let totalPage = Math.ceil(totalRecord[0].total / per_page)
		console.log(totalRecord[0].total)
		if (page > totalPage) {
			page = totalPage
		}
		if (page === 0) {
			page = 1
		}
		let offset = (page - 1) * per_page

		const results = await this.db
			.select(
				'meals.id as meal_id',
				'meals.title as meal_title',
				'meals.image as meal_image',
				'meals.is_pro as meal_is_pro',
				'meals.created_at as created_at',
			)
			.from('user_meal_favorite')
			.innerJoin('meals', function() {
				this.on('meals.id', '=', 'user_meal_favorite.meal_id')
			})
			.where({ user_id })
			.limit(per_page)
			.offset(offset)
			.orderBy('created_at', 'asc')
		return {
			results,
			total_page: totalPage,
			total_record: parseInt(totalRecord[0].total),
		}
	}
}

export default new MealService()

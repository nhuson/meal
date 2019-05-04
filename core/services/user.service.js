import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { omit } from 'lodash'
import moment from 'moment'
import BaseService from './base.service'
import configs from '../config'
import bcrypt from 'bcryptjs'

class UserService extends BaseService {
	constructor() {
		super()
		this.tableName = 'users'
	}

	tokenForUser(user) {
		const data = omit(user, 'password')
		const expiresIn = 60 * 60 * 24 * 30
		const algorithm = configs.jwt.algorithm || 'HS256'
		return jwt.sign(
			{
				data,
			},
			configs.jwt.secret,
			{
				expiresIn,
				algorithm,
			},
		)
	}

	hashPassword(plaintext) {
		return bcrypt.hashSync(plaintext, 5)
	}

	compareHash(plaintext, hash) {
		return bcrypt.compareSync(plaintext, hash)
	}

	async findByEmail(email) {
		return await this.findOne({ email })
	}

	/**
	 * Get all user
	 */
	async getUserAvailable(option) {
		let { page, per_page } = option
		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}
		let totalRecord = await this.db
			.where({ role: 'USER' })
			.from(this.tableName)
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

		let users = await this.db
			.select(
				'id',
				this.db.raw("CONCAT(firstname, ' ', lastname) as fullname"),
				'lastname',
				'firstname',
				'avatar',
				'email',
				'status',
				'role',
			)
			.where({ role: 'USER' })
			.from(this.tableName)
			.limit(per_page)
			.offset(offset)
			.orderBy('status', 'desc')
			.orderBy('created_at', 'desc')

		return {
			users,
			total_page: totalPage,
			total_record: totalRecord[0].total,
		}
	}

	/**
	 * Find user
	 */
	async findUserToUpdate(option) {
		let user = await this.db
			.where({ email: option.email })
			.whereNot({ id: option.id })
			.from(this.tableName)
			.first()
		return user
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

	async updateUserSetting(data) {
		const userConfigs = await this.db
			.where({ user_id: data.user_id })
			.from('user_configs')
			.first()
		if (!userConfigs) {
			await this.db.insert(data).into('user_configs')
		}
		await this.db
			.table('user_configs')
			.where({ user_id: data.user_id })
			.update(data)
		return
	}

	async getUserSetting(id) {
		const userConfigs = await this.db
			.where({ user_id: id })
			.from('user_configs')
			.first()

		return userConfigs
	}
}

export default new UserService()

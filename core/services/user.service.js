import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { omit } from 'lodash'
import BaseService from './base.service'
import configs from '../config'
const bcrypt = require('bcryptjs')

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

	async findUserToUpdate(option) {
		let user = await this.db.where({ email: option.email }).whereNot({id: option.id}).from(this.tableName).first()
		return user
	}
}

export default new UserService()

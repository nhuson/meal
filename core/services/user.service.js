import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { omit } from 'lodash'
import moment from 'moment'
import BaseService from './base.service'
import configs from '../config'
import bcrypt from 'bcryptjs'
import UserModel from '../models/user.model'

class UserService extends BaseService {
	constructor() {
		super()
		this.model = UserModel
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
		const data = await this.getAvailable(option)
		const users = data.users.filter((user) => user.role === 'user')
		return {
			...data,
			users,
		}
	}

	/**
	 * Find user
	 */
	async findUserToUpdate(option) {
		return await this.model
			.find({ _id: { $ne: option.id } })
			.and([{ email: option.email }])
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

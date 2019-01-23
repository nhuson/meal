import knex from '../db/database'

class BaseService {
	constructor() {
		this.tableName = ''
		this.db = knex
	}

	async create(data) {
		return await knex(this.tableName).insert(data)
	}

	async update(data, option) {
		return await knex(this.tableName)
			.where(option)
			.update(data)
	}

	async delete(option) {
		return await knex(this.tableName)
			.where(option)
			.delete()
	}

	async findAll() {
		return await knex(this.tableName).select('*')
	}

	async findOne(option) {
		return await knex(this.tableName)
			.where(option)
			.first()
	}
}

export default BaseService
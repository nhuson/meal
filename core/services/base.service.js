import knex from '../db/database'

class BaseService {
	constructor() {
		this.tableName = ''
		this.db = knex
		this.model = {}
	}

	async create(data) {
		const modelObject = new this.model(data)
		return await modelObject.save()
	}

	async update(data, option) {
		return await this.model.update(option, { $set: data }, { multi: true, new: true })
	}

	async delete(option) {
		return await this.model.remove(option)
	}

	async findAll() {
		return await this.model.find({})
	}

	async findOne(option) {
		return await this.model.findOne(option)
	}
}

export default BaseService

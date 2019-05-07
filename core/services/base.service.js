import knex from '../db/database'

class BaseService {
	constructor() {
		this.tableName = ''
		this.db = knex
		this.model = {}
	}

	create(data) {
		return this.model.create(data)
	}

	update(data, option) {
		return this.model.updateOne(option, data)
	}

	delete(option) {
		return this.model.remove(option)
	}

	findAll() {
		return this.model.find({})
	}

	findOne(option) {
		return this.model.findOne(option)
	}

	async getAvailable(option) {
		let { page, per_page } = option

		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}

		const data = await this.model.paginate({}, { page, limit: per_page })
		return {
			[option.declation]: data.docs,
			total_page: data.pages,
			total_record: data.total,
		}
	}
}

export default BaseService

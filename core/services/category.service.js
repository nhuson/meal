import BaseService from './base.service'

class CategoryService extends BaseService {
	constructor() {
		super()
		this.tableName = 'categories'
	}

	async getCategoryAvailable(option) {
		let { page, per_page } = option

		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}

		let totalRecord = await this.db.from('categories').count('id as total')
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
		let categories = await this.db
			.select('id', 'created_at', 'title', 'description')
			.from('categories')
			.limit(per_page)
			.offset(offset)
			.orderBy('created_at', 'desc')

		return {
			categories,
			total_page: totalPage,
			total_record: totalRecord[0].total,
		}
	}
}

export default new CategoryService()

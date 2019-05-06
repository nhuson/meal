import BaseService from './base.service'
import CategoryModel from '../models/category.model'

class CategoryService extends BaseService {
	constructor() {
		super()
		this.tableName = 'categories'
		this.model = CategoryModel
	}

	async getCategoryAvailable(option) {
		let { page, per_page } = option

		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}

		const data = await this.model.paginate({}, { page, limit: per_page });
		return {
			categories: data.docs,
			total_page: data.pages,
			total_record: data.total,
		}
	}
}

export default new CategoryService()

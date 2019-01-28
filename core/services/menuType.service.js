import BaseService from './base.service'

class MenuTypeService extends BaseService {
	constructor() {
		super()
		this.tableName = 'menu_types'
	}

	async getMenusAvailable(option) {
		let { page, per_page } = option

		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}

		let totalRecord = await this.db.from('menu_types').count('id as total')
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
		let menus = await this.db
			.select('created_at', 'title', 'description')
			.from('menu_types')
			.limit(per_page)
			.offset(offset)
			.orderBy('created_at', 'desc')

		return {
			menus,
			total_page: totalPage,
			total_record: totalRecord[0].total,
		}
	}
}

export default new MenuTypeService()

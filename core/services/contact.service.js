import BaseService from './base.service'

class ContactService extends BaseService {
	constructor() {
		super()
		this.tableName = 'contacts'
	}

	async getContactAvailable(option) {
		let { page, per_page } = option

		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}

		let totalRecord = await this.db.from('contacts').count('id as total')
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
		let contacts = await this.db
			.select(
				'contacts.id',
				'contacts.created_at',
				this.db.raw("CONCAT(users.firstname, ' ', users.lastname) as fullname"),
				'users.email',
				'contacts.title',
				'contacts.messages',
			)
			.from('contacts')
			.innerJoin('users', 'users.id', 'contacts.user_id')
			.limit(per_page)
			.offset(offset)
			.orderBy('created_at', 'desc')

		return {
			contacts,
			total_page: totalPage,
			total_record: totalRecord[0].total,
		}
	}
}

export default new ContactService()

import BaseService from './base.service'
import ContactModel from '../models/contact.model'

class ContactService extends BaseService {
	constructor() {
		super()
		this.model = ContactModel
	}

	findAll(){
		return this.model.find({}).populate({
			path: 'user',
			select: '_id email firstname lastname avatar'
		})
	}

	async getAvailable(option){
		let { page, per_page } = option

		if (page < 0 || per_page < 0) {
			throw createError(400, 'Invalid request params')
		}

		const data = await this.model.paginate({}, { page, limit: per_page, populate: {
			path: 'user',
			select: '_id avatar email firstname lastname'
		}})
		return {
			[option.declation]: data.docs,
			total_page: data.pages,
			total_record: data.total,
		}
	}
}

export default new ContactService()

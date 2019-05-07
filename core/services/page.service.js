import BaseService from './base.service'
import PageModel from '../models/page.model'

class PageService extends BaseService {
	constructor() {
		super()
		this.model = PageModel
	}
}

export default new PageService()

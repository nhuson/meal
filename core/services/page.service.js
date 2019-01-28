import BaseService from './base.service'

class PageService extends BaseService {
	constructor() {
		super()
		this.tableName = 'pages'
	}
}

export default new PageService()

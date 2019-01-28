import BaseService from './base.service'

class AllergiTypeService extends BaseService {
	constructor() {
		super()
		this.tableName = 'allergi_types'
	}
}

export default new AllergiTypeService()

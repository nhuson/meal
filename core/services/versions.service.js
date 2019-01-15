import BaseService from './base.service'

class VersionService extends BaseService {
	constructor() {
		super()
		this.tableName = 'versions'
	}


}

export default new VersionService()

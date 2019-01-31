import BaseService from './base.service'

class ConfigService extends BaseService {
	constructor() {
		super()
		this.tableName = 'configs'
	}
}

export default new ConfigService()

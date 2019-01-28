import BaseService from './base.service'

class MenuTypeService extends BaseService {
	constructor() {
		super()
		this.tableName = 'menu_types'
	}
}

export default new MenuTypeService()

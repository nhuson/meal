import BaseService from './base.service'
import MenuTypeModel from '../models/menu_type.model'

class MenuTypeService extends BaseService {
	constructor() {
		super()
		this.model = MenuTypeModel
	}
}

export default new MenuTypeService()

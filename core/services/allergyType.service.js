import BaseService from './base.service'
import AllergiTypeModel from '../models/allergi_type.model'

class AllergiTypeService extends BaseService {
	constructor() {
		super()
		this.tableName = 'allergi_types'
		this.model = AllergiTypeModel
	}
}

export default new AllergiTypeService()

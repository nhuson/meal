import BaseService from './base.service'
import CategoryModel from '../models/category.model'

class CategoryService extends BaseService {
	constructor() {
		super()
		this.model = CategoryModel
	}
}

export default new CategoryService()

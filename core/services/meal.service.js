import BaseService from './base.service'

class MealService extends BaseService {
	constructor() {
		super()
		this.tableName = 'meals'
	}
}

export default new MealService()

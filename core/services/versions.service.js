import BaseService from './base.service'
import VersionModel from '../models/version.model'

class VersionService extends BaseService {
	constructor() {
		super()
		this.model = VersionModel
	}
}

export default new VersionService()

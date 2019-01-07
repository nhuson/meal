import jwt from 'jsonwebtoken'
import { omit } from 'lodash'
import BaseService from './base.service'

class UserService extends BaseService {
    constructor () {
        super()
        this.tableName = "users"
    }

    tokenForUser (user) {
        const data = omit(user, 'password');
        const expiresIn = 60 * 60 * 24 * 30;
        const algorithm = process.env.JWT_ALGORITHM || 'HS256';
        return jwt.sign({
            data
        }, process.env.JWT_SECRET, {
            expiresIn,
            algorithm
        });
    }

    async findByEmail (email) {
        return await this.findOne({ email })
    }
}

export default UserService
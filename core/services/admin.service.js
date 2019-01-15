import jwt from 'jsonwebtoken'
import {
    omit
} from 'lodash'
import BaseService from './base.service'
import configs from '../config'
const bcrypt = require('bcryptjs')

class AdminService extends BaseService {
    constructor() {
        super()
        this.tableName = 'admin_users'
    }

    tokenForUser(user) {
        const data = omit(user, 'password')
        const expiresIn = 60 * 60 * 24 * 30
        const algorithm = configs.jwt.algorithm || 'HS256'
        return jwt.sign({
                data,
            },
            configs.jwt.secret, {
                expiresIn,
                algorithm,
            },
        )
    }

    hashPassword(plaintext) {
        return bcrypt.hashSync(plaintext, 5)
    }

    compareHash(plaintext, hash) {
        return bcrypt.compareSync(plaintext, hash)
    }

    async findByEmail(email) {
        return await this.findOne({
            email
        })
    }
}

export default new AdminService()
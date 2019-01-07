import jwt from 'jsonwebtoken'
import { omit } from 'lodash'
import User from '../models/User'

class UserService {
    getInstance () {
        return new User
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

    async findOne (email) {
        return await this.getInstance().findOne({ email })
    }

    async create (data) {
        this.getInstance().create(data)
    }
}

export default UserService
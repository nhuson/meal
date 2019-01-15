import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import userService from '../services/user.service'
import adminService from '../services/admin.service';

const requireAuth = (req, res, next) => {
	if (!req.headers || !req.headers.authorization) {
		throw new createError(401, `Unauthorized token!`)
	}

	let token = req.headers.authorization
	if (token.startsWith('Bearer ')) {
		token = token.substring(7, token.length)
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
		if (err || !decodedToken) {
			throw new createError(401, err)
		}

		let now = Date.now() / 1000
		if (decodedToken.exp < now) {
			throw new createError(401, 'Unauthorized.')
		}


		userService.findByEmail(decodedToken.data.email).then(user => {
			if (!user) {
				throw new createError(401, 'Unauthorized.')
			}

			req.user = user
			next()
		})
	})
}

const requireAdminAuth = (req, res, next) => {
	if (!req.headers || !req.headers.authorization) {
		throw new createError(401, `Unauthorized token!`)
	}

	let token = req.headers.authorization
	if (token.startsWith('Bearer ')) {
		token = token.substring(7, token.length)
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
		if (err || !decodedToken) {
			throw new createError(401, err)
		}

		let now = Date.now() / 1000
		if (decodedToken.exp < now) {
			throw new createError(401, 'Unauthorized.')
		}


		adminService.findByEmail(decodedToken.data.email).then(user => {
			if (!user) {
				throw new createError(401, 'Unauthorized.')
			}

			req.user = user
			next()
		})
	})
}

export {
	requireAuth,
	requireAdminAuth
}
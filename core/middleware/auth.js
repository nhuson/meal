import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import userService from '../services/user.service'

module.exports = (role) => {
	return function(req, res, next){
		if (!req.headers || !req.headers.authorization) {
			throw createError(401, `Unauthorized token!`)
		}
	
		let token = req.headers.authorization
		if (token.startsWith('Bearer ')) {
			token = token.substring(7, token.length)
		}
	
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err || !decodedToken) {
				throw createError(401, err)
			}
	
			let now = Date.now() / 1000
			if (decodedToken.exp < now) {
				throw createError(401, 'Unauthorized.')
			}

			userService.findByEmail(decodedToken.data.email).then(user => {
<<<<<<< HEAD
				if (!user) res.status(401).json({message: 'Unauthorized.'})
				if (role && role !== user.role.toUpperCase()) res.status(401).json({message: 'Unauthorized.'})
=======
				if (!user) throw new Error('Unauthorized.')
				if (role && role !== user.role.toUpperCase()) throw new Error('Unauthorized.')
>>>>>>> 80d6d1778a093c64eadb9d9a464fd9568d91cf9f
				req.user = user

				next()
			}).catch(err => {
				res.status(500).json({message: 'Internal server error'})
			})
		})
	}
}
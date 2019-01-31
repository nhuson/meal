import createError from 'http-errors'
import userService from '../services/user.service'
import configs from '../config'
import uuidv4 from 'uuid/v4'

/**
 * @route   POST api/auth/signup
 * @des     Return current user with token
 */
module.exports.signup = async (req, res, next) => {
	const data = req.body || {}
	const email = data.email.toLowerCase().trim()
	try {
		const user = await userService.findByEmail(email)
		if (user) {
			throw createError(400, 'Email already exists')
		}

		const newUser = {
			firstname: data.firstname,
			lastname: data.lastname,
			email: email,
			password: userService.hashPassword(data.password),
			role: 'USER',
		}
		await userService.create(newUser)

		delete newUser.password
		res.status(200).json({
			success: 'success',
			message: 'The user was successfully created!',
			data: {
				token: userService.tokenForUser(newUser),
			},
		})
	} catch (error) {
		next(error)
	}
}

/**
 * @route   POST api/auth/login
 * @des     Return JWT token
 */
module.exports.login = async (req, res, next) => {
	const data = req.body || {}
	const email = data.email.toLowerCase().trim()
	const user = await userService.findByEmail(email)
	if (!user) {
		throw createError(404, 'User not found')
	}

	if (!(await userService.compareHash(data.password, user.password))) {
		throw createError(403, 'Invalid username or password.')
	}

	if (user.status == configs.account.BLOCKED) {
		throw createError(400, 'Your account is blocked.')
	}

	delete user.password
	res.status(200).json({
		success: 'success',
		message: 'You have been successfully logged in!',
		data: {
			token: userService.tokenForUser(user),
			user: user,
		},
	})
}

/**
 * @route   POST api/auth/forgot-password
 * @des     Return success with email instructions
 */
module.exports.forgotPassword = async (req, res, next) => {
	const data = req.body || {}
	const email = data.email.toLowerCase().trim()
	const user = await userService.findByEmail(email)
	if (!user) {
		throw createError(404, 'User not found')
	}

	const recovery_code = uuidv4()
	await userService.update(
		{
			recovery_code,
		},
		{
			email,
		},
	)

	res.status(200).json({
		success: 'success',
		message: 'Please check your email to get your recovery code.',
	})
}

/**
 * @route   POST api/auth/reset-password
 * @des     Return success
 */
module.exports.resetPassword = async (req, res, next) => {
	const data = req.body || {}
	const email = data.email.toLowerCase().trim()
	const { new_password, recovery_code } = data
	const options = {
		email,
		recovery_code,
	}

	const user = await userService.findOne(options)
	if (!user) {
		throw createError(404, 'User not found')
	}

	const updateData = {
		password: userService.hashPassword(new_password),
	}
	await userService.update(updateData, options)

	res.status(200).json({
		success: 'success',
		message: 'Your password has been reset successfully.',
	})
}

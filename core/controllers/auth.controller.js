import createError from 'http-errors';
import userService from '../services/user.service';

/**
 * @route   POST api/auth/signup
 * @des     Return current user with token
 */
module.exports.signup = async (req, res, next) => {
	const data = req.body || {};
	const email = data.email.toLowerCase().trim();
	try {
		const user = await userService.findByEmail(email);
		if (user) {
			throw createError(400, 'Email already exists');
		}

		const newUser = await userService.create({
			firstname: data.firstname,
			lastname: data.lastname,
			email: email,
			password: userService.hashPassword(data.password),
		});

		res.status(200).json({
			success: 'success',
			token: userService.tokenForUser(newUser),
		});
	} catch (error) {
		next(error);
	}
};

/**
 * @route   POST api/auth/login
 * @des     Return JWT token
 */
module.exports.login = async (req, res, next) => {
	const data = req.body || {};
	const email = data.email.toLowerCase().trim();
	const user = await userService.findByEmail(email);
	if (!user) {
		throw createError(404, 'User not found');
	}

	if (!(await userService.compareHash(data.password, user.password))) {
		throw createError(403, 'Invalid username or password.');
	}

	res.status(200).json({
		success: 'success',
		token: userService.tokenForUser(user)
	});
};

/**
 * @route   POST api/auth/forgot-password
 * @des     Return JWT token
 */
module.exports.forgotPassword = async (req, res, next) => {};

/**
 * @route   POST api/auth/reset-password
 * @des     Return JWT token
 */
module.exports.resetPassword = async (req, res, next) => {};
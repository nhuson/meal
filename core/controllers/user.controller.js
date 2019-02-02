import userService from '../services/user.service'
import createError from 'http-errors'
import _ from 'lodash'
/**
 * @route   GET
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const getUser = async (req, res, next) => {
	try {
		let data = await userService.getUserAvailable({
			page: parseInt(req.query.page),
			per_page: parseInt(req.query.per_page),
		})

		res.status(200).json({
			success: 'success',
			data,
		})
	} catch (err) {
		next(err)
	}
}

/**
 * @route   PUT
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const updateUser = async (req, res, next) => {
	try {
		const { id } = req.params
		const user = await userService.findOne({ id })
		if (!user) {
			throw createError(404, 'User not found')
		}

		let putData = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			status: req.body.status,
		}

		putData = _(putData)
			.omit(_.isUndefined)
			.omit(_.isNull)
			.value()

		const updateData = { ...user, ...putData }
		await userService.update(updateData, { id })

		res.status(200).json({
			success: 'success',
			message: 'The user has been successfully updated.',
		})
	} catch (err) {
		next(err)
	}
}
export { getUser, updateUser }

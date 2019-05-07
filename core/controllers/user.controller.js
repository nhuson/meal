import userService from '../services/user.service'
import createError from 'http-errors'
import _ from 'lodash'
import uploadS3 from '../utils/uploadS3'

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
			declation: 'users',
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
		const user = await userService.findOne({ _id: id })
		if (!user) {
			throw createError(404, 'User not found')
		}
		const userByEmail = await userService.findUserToUpdate({
			email: req.body.email,
			id,
		})
		if (userByEmail.length > 0) {
			throw createError(404, 'User already exists!')
		}

		let avatar = undefined
		if (req.files && req.files.avatar) {
			avatar = await uploadS3.excute(req.files.avatar, 'users/avatar')
		}
		let putData = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			avatar,
		}
		if (req.user.role == 'admin') {
			putData.status = req.body.status
		}

		putData = _(putData)
			.omit(_.isUndefined)
			.omit(_.isNull)
			.value()

		await userService.update(putData, { _id: id })

		res.status(200).json({
			success: 'success',
			message: 'The user has been successfully updated.',
		})
	} catch (err) {
		next(err)
	}
}

const updateUserSetting = async (req, res, next) => {
	try {
		await userService.updateUserSetting({
			menu_type: req.body.menu_type,
			allergy: JSON.stringify(req.body.allergy),
			meal_size: req.body.meal_size,
			user_id: req.user.id,
		})
		res.status(200).json({
			success: 'success',
			message: 'Updated configs.',
		})
	} catch (error) {
		next(error)
	}
}

const getUserSetting = async (req, res, next) => {
	try {
		const data = await userService.getUserSetting(req.user.id)
		res.status(200).json({
			success: 'success',
			message: 'Updated configs.',
			data,
		})
	} catch (error) {
		next(error)
	}
}

export { getUser, updateUser, updateUserSetting, getUserSetting }

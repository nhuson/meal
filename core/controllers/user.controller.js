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
		const userByEmail = await userService.findUserToUpdate({
			email: req.body.email,
			id,
		})
		if (userByEmail) {
			throw createError(404, 'User already exists!')
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

const createMealCalendar = async (req, res, next) => {
	try {
		const data = {
			user_id: req.user.id,
			...req.body,
		}
		await userService.createMealCalendar(data)

		res.status(200).json({
			success: 'success',
			message: 'The meals has been successfully added to plan.',
		})
	} catch (error) {
		next(error)
	}
}

const getMealByDay = async (req, res, next) => {
	try {
		const data = await userService.getMealByDay({
			date: req.params.date,
			user_id: req.user.id,
		})
		res.status(200).json({
			success: 'success',
			message: 'The meals has been successfully added to plan.',
			data,
		})
	} catch (error) {
		next(error)
	}
}

const getMealByUserId = async (req, res, next) => {
	try {
		const data = await userService.getMealByUserId(req.user.id)
		res.status(200).json({
			success: 'success',
			message: 'The meals has been successfully added to plan.',
			data,
		})
	} catch (error) {
		next(error)
	}
}

const getMealRangeDay = async (req, res, next) => {
	try {
		const data = await userService.getMealRangeDay({
			user_id: req.user.id,
			from: req.params.from,
			to: req.params.to,
		})
		res.status(200).json({
			success: 'success',
			message: 'The meals has been successfully added to plan.',
			data,
		})
	} catch (error) {
		next(error)
	}
}

export {
	getUser,
	updateUser,
	createMealCalendar,
	getMealByDay,
	getMealByUserId,
	getMealRangeDay,
}

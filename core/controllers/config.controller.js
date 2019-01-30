import createError from 'http-errors'
import configService from '../services/config.service'

/**
 * @route   GET
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const getAll = async (req, res, next) => {
	try {
		let data = await configService.findAll()

		res.status(200).json({
			success: 'success',
			data,
		})
	} catch (err) {
		next(err)
	}
}

/**
 * @route   POST
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const create = async (req, res, next) => {
	try {
		res.status(200).json({
			success: 'success',
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
const update = async (req, res, next) => {
	try {
		let { id } = req.params

		res.status(200).json({
			success: 'success',
		})
	} catch (err) {
		next(err)
	}
}

/**
 * @route   DELETE
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const remove = async (req, res, next) => {
	try {
		let { id } = req.params

		res.status(200).json({
			success: 'success',
		})
	} catch (err) {
		next(err)
	}
}

export default {
	getAll,
	create,
	update,
	remove,
}

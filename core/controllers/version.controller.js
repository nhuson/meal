import createError from 'http-errors'
import versionService from '../services/versions.service'

/**
 * @route   GET
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const getAll = async (req, res, next) => {
	try {
		let data = await versionService.findAll()
		res.status(200).json({
			success: 'success',
			data
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
		const { version, os, url, force } = req.body
		const newVersion = await versionService.create({ version, os, url, force })

		res.status(200).json({
			success: 'success',
			message: 'The version has been successfully created.',
			data: newVersion
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
		const { id } = req.params
		const { ...updateData } = req.body
		await versionService.update(updateData, { _id: id })

		res.status(200).json({ success: 'success' })
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
		const { id } = req.params
		await versionService.delete({ _id: id })

		res.status(200).json({ success: 'success' })
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, remove }

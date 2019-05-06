import createError from 'http-errors'
import pageService from '../services/page.service'

/**
 * @route   GET
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const getAll = async (req, res, next) => {
	try {
		let data = await pageService.findAll()
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
		let { title, url } = req.body
		let page = await pageService.findOne({ title })
		if (page) {
			throw createError(400, 'This page already exists')
		}

		const newPage = await pageService.create({ title, url })

		res.status(200).json({
			success: 'success',
			message: 'The page has been successfully created.',
			data: newPage
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
		await pageService.update(updateData, { _id: id })

		res.status(200).json({
			success: 'success',
			message: 'The page has been successfully updated.'
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
		const { id } = req.params
		await pageService.delete({ _id: id })

		res.status(200).json({
			success: 'success',
			message: 'The page has been successfully deleted.'
		})
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, remove }

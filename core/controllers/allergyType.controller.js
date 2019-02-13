import createError from 'http-errors'
import allergyTypeService from '../services/allergyType.service'
import _ from 'lodash'
/**
 * @route   GET
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const getAll = async (req, res, next) => {
	try {
		if (!req.query.page || !req.query.per_page) {
			let data = await allergyTypeService.findAll()
			res.status(200).json({
				success: 'success',
				data,
			})
		} else {
			let data = await allergyTypeService.getAllergiesAvailable({
				page: parseInt(req.query.page),
				per_page: parseInt(req.query.per_page),
			})
			res.status(200).json({
				success: 'success',
				data,
			})
		}
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
		const { title, description } = req.body
		await allergyTypeService.create({
			title,
			description,
		})

		res.status(200).json({ success: 'success' })
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
		const allergiType = await allergyTypeService.findOne({ id })
		if (!allergiType) {
			throw createError(404, 'Not found')
		}

		let putData = {
			title: req.body.title,
			description: req.body.description,
		}
		putData = _(putData)
			.omit(_.isUndefined)
			.omit(_.isNull)
			.value()

		const updateData = { ...allergiType, ...putData }
		await allergyTypeService.update(updateData, { id })

		res.status(200).json({ 
			success: 'success',
			message: 'The allergy has been successfully updated.'
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
		const data = await allergyTypeService.findOne({ id })
		if (!data) {
			throw createError(404, 'Not found')
		}

		await allergyTypeService.delete({ id })

		res.status(200).json({ 
			success: 'success',
			message: 'The allergy has been successfully deleted.'
		 })
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, remove }
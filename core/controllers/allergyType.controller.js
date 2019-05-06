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
			let allergies = await allergyTypeService.findAll()
			res.status(200).json({
				success: 'success',
				data: { allergies },
			})
		} else {
			let data = await allergyTypeService.getAvailable({
				page: parseInt(req.query.page),
				per_page: parseInt(req.query.per_page),
				declation: 'allergies'
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
		const allergy = await allergyTypeService.findOne({ title })
		if (allergy) {
			throw createError(400, 'This allergy already exists')
		}

		const newAllergy = await allergyTypeService.create({title, description})
		res.status(200).json({
			success: 'success',
			message: 'The allergy has been successfully created.',
			data: newAllergy,
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
		await allergyTypeService.update(updateData, {_id : id})

		res.status(200).json({
			success: 'success',
			message: 'The allergy has been successfully updated.',
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
		await allergyTypeService.delete({_id : id})

		res.status(200).json({
			success: 'success',
			message: 'The allergy has been successfully deleted.',
		})
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, remove }

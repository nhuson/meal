import createError from 'http-errors'
import _ from 'lodash'
import typeIngredientService from '../services/typeIngredient.service'

/**
 * @route   GET api/type-ingredient
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const getAll = async (req, res, next) => {
	try {
		if (!req.query.page || !req.query.per_page) {
			let typeIngredients = await typeIngredientService.findAll()
			res.status(200).json({
				success: 'success',
				data: {typeIngredients},
			})
		} else {
			let data = await typeIngredientService.getAvailable({
				page: parseInt(req.query.page),
				per_page: parseInt(req.query.per_page),
				declation: 'typeIngredients'
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
 * @route   POST api/type-ingredient
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const create = async (req, res, next) => {
	try {
		let { title, description, image } = req.body
		let typeIngredient = await typeIngredientService.findOne({ title })
		if (typeIngredient) {
			throw createError(400, 'This type ingredient already exists')
		}

		const newTypeIngredient = await typeIngredientService.create({title, description, image})
		res.status(200).json({
			success: 'success',
			message: 'The type ingredient has been successfully created.',
			data: newTypeIngredient
		})
	} catch (err) {
		next(err)
	}
}

/**
 * @route   PUT api/type-ingredient
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const update = async (req, res, next) => {
	try {
		const { id } = req.params
		const { ...updateData } = req.body
		await typeIngredientService.update(updateData, {_id : id})

		res.status(200).json({
			success: 'success',
			message: 'The type ingredient has been successfully updated.',
		})
	} catch (err) {
		next(err)
	}
}

/**
 * @route   DELETE api/type-ingredient
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const deleteType = async (req, res, next) => {
	try {
		const { id } = req.params
		await typeIngredientService.delete({_id : id})

		res.status(200).json({
			success: 'success',
			message: 'The type ingredient has been successfully deleted.',
		})
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, deleteType }

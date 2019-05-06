import createError from 'http-errors'
import ingredientService from '../services/ingredient.service'

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
			let ingredients = await ingredientService.findAll()
			res.status(200).json({
				success: 'success',
				data: {ingredients},
			})
		} else {
			let data = await ingredientService.getAvailable({
				page: parseInt(req.query.page),
				per_page: parseInt(req.query.per_page),
				declation: 'ingredients'
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
		let { title, image, description, unit, type} = req.body
		let ingredient = await ingredientService.findOne({ title })
		if (ingredient) {
			throw createError(400, 'This ingredient already exists')
		}

		const newIngredient = await ingredientService.create({ title, image, description, unit, type })

		res.status(200).json({
			success: 'success',
			message: 'The Ingredient has been successfully created.',
			data: newIngredient
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
		await ingredientService.update(updateData, {_id : id})

		res.status(200).json({
			success: 'success',
			message: 'The Ingredient has been successfully updated.',
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
		await ingredientService.delete({_id : id})

		res.status(200).json({
			success: 'success',
			message: 'The Ingredient has been successfully deleted.',
		})
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, remove }

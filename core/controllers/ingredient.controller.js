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
			let data = await ingredientService.findAll()
			res.status(200).json({
				success: 'success',
				data,
			})
		} else {
			let data = await ingredientService.getAvailable({
				page: parseInt(req.query.page),
				per_page: parseInt(req.query.per_page),
				declation: 'ingredients',
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
		let { title, image, description, unit, type_id } = req.body
		let ingredient = await ingredientService.findOne({ title })
		if (ingredient) throw createError(400, 'This ingredient already exists')
		await ingredientService.create({ title, image, description, unit, type_id })

		res.status(200).json({
			success: 'success',
			message: 'The Ingredient has been successfully created.',
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
		const dataUpdate = await ingredientService.findOne({ _id: id })
		if (!dataUpdate) {
			throw createError(404, 'Ingredient not found')
		}
		let putData = {
			title: req.body.title,
			description: req.body.description,
			image: req.body.image,
			unit: req.body.unit,
			type_id: req.body.type_id,
		}
		putData = _(putData)
			.omit(_.isUndefined)
			.omit(_.isNull)
			.value()

		await ingredientService.update({ ...dataUpdate, ...putData }, { id })

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
		let { id } = req.params
		const dataDel = await ingredientService.findOne({ id })
		if (!dataDel) {
			throw createError(404, 'Ingredient not found')
		}
		await ingredientService.delete({ id })

		res.status(200).json({
			success: 'success',
			message: 'The Ingredient has been successfully deleted.',
		})
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, remove }

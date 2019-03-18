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
			let data = await typeIngredientService.getTypeIngredientsAvailable({
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
 * @route   POST api/type-ingredient
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const create = async (req, res, next) => {
	try {
		console.log(req.body)
		let { title, description, image } = req.body
		let typeIngredient = await typeIngredientService.findOne({ title })
		if (typeIngredient) throw createError(400, 'This type ingredient already exists')

		const newTypeIngredient = {
			title,
			description,
			image
		}

		const ids = await typeIngredientService.create(newTypeIngredient)
		newTypeIngredient.id = ids[0]

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
		let { id } = req.params
		const dataUpdate = await typeIngredientService.findOne({ id })
		if (!dataUpdate) {
			throw createError(404, 'Type ingredient not found')
		}
		let putData = {
			title: req.body.title,
			description: req.body.description,
			image: req.body.image,
		}
		putData = _(putData)
			.omit(_.isUndefined)
			.omit(_.isNull)
			.value()
		await typeIngredientService.update({ ...dataUpdate, ...putData }, { id })

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
		let { id } = req.params
		const dataDel = await typeIngredientService.findOne({ id })
		if (!dataDel) {
			throw createError(404, 'Type ingredient not found')
		}
		await typeIngredientService.delete({ id })

		res.status(200).json({
			success: 'success',
			message: 'The type ingredient has been successfully deleted.',
		})
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, deleteType }

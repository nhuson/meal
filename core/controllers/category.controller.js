import createError from 'http-errors'
import categoryService from '../services/category.service'
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
			let categories = await categoryService.findAll()
			res.status(200).json({
				success: 'success',
				data: {categories},
			})
		} else {
			let data = await categoryService.getAvailable({
				page: parseInt(req.query.page),
				per_page: parseInt(req.query.per_page),
				declation: 'categories'
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
		const { title, description, image} = req.body
		const category = await categoryService.findOne({ title })
		if (category) {
			throw createError(400, 'This category already exists')
		}

		const newCategory = await categoryService.create({title, description, image})

		res.status(200).json({
			success: 'success',
			message: 'The category has been successfully created.',
			data: newCategory
		})
	} catch (err) {
		console.log(err)
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
		await categoryService.update(updateData, {_id : id})

		res.status(200).json({
			success: 'success',
			message: 'The category has been successfully updated.'
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
		await categoryService.delete({_id : id})
		
		res.status(200).json({
			success: 'success',
			message: 'The category has been successfully deleted.',
		})
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, remove }

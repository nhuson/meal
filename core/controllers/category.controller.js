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
			let data = await categoryService.findAll()
			res.status(200).json({
				success: 'success',
				data,
			})
		} else {
			let data = await categoryService.getCategoryAvailable({
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
		const { title, description, image } = req.body
		console.log(req.body)
		const category = await categoryService.findOne({ title })
		if (category) {
			throw createError(400, 'This category already exists')
		}

		await categoryService.create({
			title,
			description,
			image,
		})

		res.json(200, {
			success: 'success',
			message: 'The category has been successfully created.',
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
		const category = await categoryService.findOne({ id })
		if (!category) {
			throw createError(404, 'Category not found')
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

		const updateData = { ...category, ...putData }
		await categoryService.update(updateData, { id })

		res.json(200, {
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
		const category = await categoryService.findOne({ id })
		if (!category) {
			throw createError(404, 'Category not found')
		}

		await categoryService.delete({ id })

		res.json(200, {
			success: 'success',
			message: 'The category has been successfully deleted.',
		})
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, remove }

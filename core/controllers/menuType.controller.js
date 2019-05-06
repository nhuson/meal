import createError from 'http-errors'
import menuTypeService from '../services/menuType.service'
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
			let menues = await menuTypeService.findAll()
			res.status(200).json({
				success: 'success',
				data: { menues },
			})
		} else {
			let data = await menuTypeService.getAvailable({
				page: parseInt(req.query.page),
				per_page: parseInt(req.query.per_page),
				declation: 'menues'
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
		const menu = await menuTypeService.findOne({ title })
		if (menu) {
			throw createError(400, 'This menu already exists')
		}

		const newMenu = await menuTypeService.create({title, description})
		res.status(200).json({
			success: 'success',
			message: 'The menu type has been successfully created.',
			data: newMenu,
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
		await menuTypeService.update(updateData, {_id : id})

		res.status(200).json({
			success: 'success',
			message: 'The menu type has been successfully updated.',
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
		await menuTypeService.delete({_id : id})

		res.status(200).json({
			success: 'success',
			message: 'The menu type has been successfully deteled.',
		})
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, remove }

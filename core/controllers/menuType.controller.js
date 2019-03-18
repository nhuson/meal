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
			let menus = await menuTypeService.findAll()
			res.status(200).json({
				success: 'success',
				data: {menus},
			})
		} else {
			let data = await menuTypeService.getMenusAvailable({
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
		const menu = await menuTypeService.findOne({ title })
		if (menu) {
			throw createError(400, 'This menu already exists')
		}

		const newMenu = {
			title,
			description
		}

		const ids = await menuTypeService.create(newMenu)
		newMenu.id = ids[0]

		res.status(200).json({
			success: 'success',
			message: 'The menu type has been successfully created.',
			data: newMenu
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
		const menuType = await menuTypeService.findOne({ id })
		if (!menuType) {
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

		const updateData = { ...menuType, ...putData }
		await menuTypeService.update(updateData, { id })

		res.status(200).json({ 
			success: 'success',
			message: 'The menu type has been successfully updated.'
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
		const data = await menuTypeService.findOne({ id })
		if (!data) {
			throw createError(404, 'Not found')
		}

		await menuTypeService.delete({ id })

		res.status(200).json({ 
			success: 'success',
			message: 'The menu type has been successfully deteled.'
		 })
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, remove }

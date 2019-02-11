import createError from 'http-errors'
import mealService from '../services/meal.service'

/**
 * @route   GET
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return res.json
 */
const getAll = async (req, res, next) => {
	try {
		let data = await mealService.findAll()

		res.status(200).json({
			success: 'success',
			data,
		})
	} catch (err) {
		next(err)
	}
}

const getMealsByPage = async (req, res, next) => {
	try {
		let data = await mealService.getMeals({
			page: parseInt(req.query.page),
			per_page: parseInt(req.query.per_page)
		})

		res.status(200).json({
			success: 'success',
			data,
		})
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
		const {
			title,
			instruction,
			image,
			time,
			serving,
			calorie,
			count_rate,
			rate,
			is_pro,
			cate_id,
			menu_id,
			allergi_id,
		} = req.body

		console.log(req.body)
		await mealService.create({
			title,
			image,
			time,
			serving,
			calorie,
			count_rate,
			rate,
			is_pro,
			cate_id,
			menu_id,
			allergi_id,
			instruction: JSON.stringify(instruction)
		})

		res.status(200).json({ success: 'success', message: 'The meal has been successfully created.' })
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
		const data = await mealService.findOne({ id })
		if (!data) {
			throw createError(404, 'Not found')
		}

		res.status(200).json({ success: 'success' })
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
		const data = await mealService.findOne({ id })
		if (!data) {
			throw createError(404, 'Not found')
		}

		await mealService.delete({ id })

		res.status(200).json({ success: 'success' })
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, remove, getMealsByPage }

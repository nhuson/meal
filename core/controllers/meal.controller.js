import createError from 'http-errors'
import mealService from '../services/meal.service'
import redis from '../utils/redis'
import config from '../config'

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
			data
		})
	} catch (err) {
		next(err)
	}
}

const getMealsByPage = async (req, res, next) => {
	try {
		let data = await mealService.getAvailable({
			page: parseInt(req.query.page),
			per_page: parseInt(req.query.per_page),
			declation: 'meals'
		})

		res.status(200).json({
			success: 'success',
			data
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
		const { ...mealData } = req.body
		await mealService.create(mealData)

		res.status(200).json({
			success: 'success',
			message: 'The meal has been successfully created.'
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
		const { ...mealData } = req.body
		const data = await mealService.findOne({ _id: id })
		if (!data) {
			throw createError(404, 'Meal not found.')
		}
		await mealService.update(mealData, { _id: id })
		res.status(200).json({
			success: 'success',
			message: 'The meal has been successfully updated.'
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
		const data = await mealService.findOne({ _id: id })
		if (!data) {
			throw createError(404, 'Meal not found.')
		}

		await mealService.delete({ _id: id })

		res.status(200).json({
			success: 'success',
			message: 'The meal has been successfully deleted.'
		})
	} catch (err) {
		next(err)
	}
}

const getIngredientByMealId = async (req, res, next) => {
	try {
		let { id } = req.params
		const data = await mealService.getIngredientByMealId({ id })
		if (!data) {
			throw createError(404, 'Not found ingredient by meal id.')
		}

		res.status(200).json({ success: 'success', data })
	} catch (err) {
		next(err)
	}
}

const addFavorite = async (req, res, next) => {
	try {
		await mealService.addFavorite({
			user_id: req.user.id,
			meal_id: req.body.meal_id
		})

		res.status(200).json({ success: 'success', message: 'Added meal favorite!' })
	} catch (err) {
		next(err)
	}
}

const removeFavorite = async (req, res, next) => {
	try {
		await mealService.removeFavorite({
			user_id: req.user.id,
			meal_id: req.body.meal_id
		})

		res.status(200).json({ success: 'success', message: 'Removed meal favorite!' })
	} catch (err) {
		next(err)
	}
}

const getMealFavoriteByUser = async (req, res, next) => {
	try {
		const data = await mealService.getMealFavoriteByUser({
			user_id: req.user.id,
			page: req.query.page,
			per_page: req.query.per_page
		})

		res.status(200).json({ success: 'success', message: 'Get meal favorite!', data })
	} catch (err) {
		next(err)
	}
}

const createMealPlan = async (req, res, next) => {
	try {
		const data = {
			user_id: req.user.id,
			...req.body,
			date: new Date(req.body.date).getTime()
		}
		await mealService.createMealPlan(data)

		res.status(200).json({
			success: 'success',
			message: 'The meals has been successfully added to plan.'
		})
	} catch (error) {
		next(error)
	}
}

const editMealPlan = async (req, res, next) => {
	try {
		const data = {
			user_id: req.user.id,
			...req.body,
			date: new Date(req.body.date).getTime()
		}
		await mealService.editMealPlan(data)

		res.status(200).json({
			success: 'success',
			message: 'The meal plan has been successfully updated.'
		})
	} catch (error) {
		next(error)
	}
}

const getMealByDay = async (req, res, next) => {
	try {
		const data = await mealService.getMealByDay({
			date: new Date(req.params.date).getTime(),
			user_id: req.user.id
		})
		res.status(200).json({
			success: 'success',
			message: 'The meals has been successfully added to plan.',
			data
		})
	} catch (error) {
		next(error)
	}
}

const getMealByUserId = async (req, res, next) => {
	try {
		const data = await mealService.getMealByUserId({
			user_id: req.user.id,
			page: parseInt(req.query.page),
			per_page: parseInt(req.query.per_page)
		})
		res.status(200).json({
			success: 'success',
			message: 'The meals has been successfully added to plan.',
			data
		})
	} catch (error) {
		next(error)
	}
}

const getMealRangeDay = async (req, res, next) => {
	try {
		const data = await mealService.getMealRangeDay({
			user_id: req.user.id,
			from: req.params.from,
			to: req.params.to,
			page: parseInt(req.query.page),
			per_page: parseInt(req.query.per_page)
		})
		res.status(200).json({
			success: 'success',
			message: 'The meals has been successfully added to plan.',
			data
		})
	} catch (error) {
		next(error)
	}
}

export {
	getAll,
	create,
	update,
	remove,
	getMealsByPage,
	getIngredientByMealId,
	addFavorite,
	removeFavorite,
	getMealFavoriteByUser,
	createMealPlan,
	editMealPlan,
	getMealByDay,
	getMealByUserId,
	getMealRangeDay
}

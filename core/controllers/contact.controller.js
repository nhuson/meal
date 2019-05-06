import createError from 'http-errors'
import contactService from '../services/contact.service'

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
			let contacts = await contactService.findAll()
			res.status(200).json({
				success: 'success',
				data: {contacts},
			})
		} else {
			let data = await contactService.getAvailable({
				page: parseInt(req.query.page),
				per_page: parseInt(req.query.per_page),
				declation: 'contacts'
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
		const { title, messages } = req.body
		await contactService.create({ title, messages, user: req.user._id})
		
		res.status(200).json({
			success: 'success',
			message: 'Your message was sent successfully.',
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
		await contactService.update(updateData, {_id : id})

		res.status(200).json({
			success: 'success',
			message: 'The contact has been successfully updated.'
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
		await contactService.delete({_id : id})

		res.status(200).json({
			success: 'success',
			message: 'The contact has been successfully deteled.',
		})
	} catch (err) {
		next(err)
	}
}

export { getAll, create, update, remove }

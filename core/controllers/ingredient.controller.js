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
        let data = await ingredientService.findAll()

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
        let { title, image, description, unit, type_id } = req.body
        await ingredientService.create({ title, image, description, unit, type_id })

        res.json(200, { success: 'success' })
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
        let { title, image, description, unit, type_id } = req.body
        await ingredientService.update({ title, image, description, unit, type_id }, { id })

        res.json(200, { success: 'success' })
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
        await ingredientService.delete({ id })

        res.json(200, { success: 'success' })
    } catch (err) {
        next(err)
    }
}

export {
    getAll,
    create,
    update,
    remove
}

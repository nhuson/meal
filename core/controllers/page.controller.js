import createError from 'http-errors'
import pageService from '../services/page.service'

/**
 * @route   GET 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @return res.json
 */
const getAll = async (req, res, next) => {
    try {
        let data = await pageService.findAll()

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
        let { title, type, description } = req.body
        await pageService.create({ title, type, description })

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
        let { title, type, description } = req.body
        await pageService.update({ title, type, description }, { id })

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
        await pageService.delete({ id })

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

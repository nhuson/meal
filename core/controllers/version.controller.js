import createError from 'http-errors'
import versionService from '../services/versions.service'

/**
 * @route   GET 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @return res.json
 */
const getAll = async (req, res, next) => {
    try {
        let data = await versionService.findAll()

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
        let { version, os, url, force } = req.body
        versionService.update({ version, os, url, force }, { id })

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
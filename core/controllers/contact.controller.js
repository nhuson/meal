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
        let data = await contactService.findAll()
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
        const { title, messages } = req.body
        await contactService.create({
            title,
            messages,
            user_id: req.user.id
        })

        res.json(200, { success: 'success '})
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
        const data = await contactService.findOne({ id})
        if (!data){
            throw createError(404, 'Not found')
        }


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
        const data = await contactService.findOne({ id})
        if (!data){
            throw createError(404, 'Not found')
        }

        await contactService.delete({id})

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

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
        let page = await ingredientService.findOne({ title })
        if (page) throw createError(400,'This page already exists')
        await pageService.create({ title, type, description })

        res.json(200, { success: 'success', message: 'The page has been successfully created.' })
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
        const dataUpdate = await ingredientService.findOne({ id})
        if (!dataUpdate){
            throw createError(404, 'Ingredient not found')
        }
        let putData = {
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
        }
        putData = _(putData)
                .omit(_.isUndefined)
                .omit(_.isNull)
                .value()

        await pageService.update({...dataUpdate, ...putData}, { id })

        res.json(200, {
            success: 'success',
            message: 'The page has been successfully updated.'
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
        const dataDel = await ingredientService.findOne({ id})
        if (!dataDel){
            throw createError(404, 'Ingredient not found')
        }
        await pageService.delete({ id })

        res.json(200, {
            success: 'success',
            message: 'The page has been successfully deleted.'
        })
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

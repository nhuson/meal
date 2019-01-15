import createError from 'http-errors'
import typeIngredientService from '../services/typeIngredient.service'

/**
 * @route   GET api/type-ingredient
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @return res.json
 */
const getAll = async (req, res, next) => {
    try {
        let typeIngredient = await typeIngredientService.findAll()

        res.status(200).json({
			success: 'success',
			data: typeIngredient
		})
    } catch (err) {
        next(err)
    }
}

/**
 * @route   POST api/type-ingredient
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @return res.json
 */
const create = async (req, res, next) => {
    try {
        let { title, description, image } = req.body || {}
        await typeIngredientService.create({ 
            title,
            description,
            image
        })

        res.json(200, { success: 'success' })
    } catch (err) {
        next(err)
    }
}

/**
 * @route   PUT api/type-ingredient
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @return res.json
 */
const update = async (req, res, next) => {
    try {
        let { title, description, image } = req.body || {}
        let { id } = req.params
        await typeIngredientService.update(
            { 
                title,
                description,
                image
            },
            { id }
        )

        res.json(200, { success: 'success' })
    } catch (err) {
        next(err)
    }
}

/**
 * @route   DELETE api/type-ingredient
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @return res.json
 */
const deleteType = async (req, res, next) => {
    try {
        let { id } = req.params
        await typeIngredientService.update({ id })

        res.json(200, { success: 'success' })
    } catch (err) {
        next(err)
    }
}

export {
    getAll,
    create,
    update,
    deleteType
}

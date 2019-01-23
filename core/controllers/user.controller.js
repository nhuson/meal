import createError from 'http-errors'
import userService from '../services/user.service'

/**
 * @route   GET 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @return res.json
 */
const getUser = async (req, res, next) => {
	try {
        let data = await userService.getUserAvailable()

        res.status(200).json({
            success: 'success',
            data
        })
    } catch (err) {
        next(err)
    }
}

export default {
	getUser
}
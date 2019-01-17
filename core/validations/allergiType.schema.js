import Joi from 'joi'

export default Joi.object({
	title: Joi.string().max(45).required(),
    description: Joi.string()
})
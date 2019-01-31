import Joi from 'joi'

export default Joi.object({
	title: Joi.string().required(),
	type: Joi.string().required(),
	description: Joi.string().required(),
})

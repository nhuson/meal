import Joi from 'joi'

export default Joi.object({
	title: Joi.string().required(),
	image: Joi.string().required(),
	description: Joi.string().required(),
	unit: Joi.string(),
	type_id: Joi.string().required(),
})

import Joi from 'joi'

export default Joi.object({
	title: Joi.string()
		.min(6)
		.max(100)
		.required(),
	messages: Joi.string()
		.min(10)
		.required(),
})

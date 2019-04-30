import Joi from 'joi'

module.exports = Joi.object({
	firstname: Joi.string().required(),
	lastname: Joi.string().required(),
	email: Joi.string()
		.email()
		.lowercase()
		.required(),
})

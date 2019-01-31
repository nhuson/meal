import Joi from 'joi'

module.exports = Joi.object({
	email: Joi.string()
		.email()
		.lowercase()
		.required(),
})

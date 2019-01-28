import Joi from 'joi'

module.exports = Joi.object({
	recovery_code: Joi.string().required(),
	email: Joi.string()
		.email()
		.lowercase()
		.required(),
	new_password: Joi.string()
		.min(6)
		.required()
		.strict(),
	confirm_new_password: Joi.string()
		.valid(Joi.ref('new_password'))
		.required()
		.strict(),
})

import Joi from 'joi'

module.exports = Joi.object({
	menu_type: Joi.number()
		.integer()
		.required(),
	allergy: Joi.array(),
	meal_size: Joi.number()
		.integer()
		.required(),
})

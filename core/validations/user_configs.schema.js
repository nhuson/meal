import Joi from 'joi'

module.exports = Joi.object({
	meal_type: Joi.number()
		.integer()
		.required(),
	menu_type: Joi.number()
		.integer()
		.required(),
	allergy: Joi.array(),
	meal_size: Joi.number()
		.integer()
		.required(),
})

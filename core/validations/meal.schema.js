import Joi from 'joi'

export default Joi.object({
	title: Joi.string()
		.max(250)
		.required(),
	image: Joi.string()
		.max(250)
		.required(),
	time: Joi.number()
		.integer()
		.required(),
	serving: Joi.number()
		.integer()
		.required(),
	calorie: Joi.number().integer(),
	count_rate: Joi.number().integer(),
	rate: Joi.number().integer(),
	is_pro: Joi.number()
		.integer()
		.allow(0, 1),
	category: Joi.string().required(),
	menu_type: Joi.string().required(),
	allergy: Joi.string().required(),
	instructions: Joi.array().required(),
	ingredients: Joi.array().required(),
})

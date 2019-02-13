import Joi from 'joi'

export default Joi.object({
	title: Joi.string()
		.max(100)
		.required(),
	image: Joi.string()
		.max(100)
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
	cate_id: Joi.number()
		.integer()
		.required(),
	menu_id: Joi.number()
		.integer()
		.required(),
	allergi_id: Joi.number()
		.integer()
		.required(),
	instruction: Joi.array().required(),
	ingredient_id: Joi.array().required(),
})

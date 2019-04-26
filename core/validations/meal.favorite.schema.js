import Joi from 'joi'

export default Joi.object({
	meal_id: Joi.number()
		.integer()
		.required(),
})

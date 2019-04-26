import Joi from 'joi'

export default Joi.object({
	ids: Joi.array().required(),
	date: Joi.date().required(),
})

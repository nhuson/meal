import Joi from 'joi'

export default Joi.object({
	version: Joi.string().required(),
	os: Joi.string().required(),
	url: Joi.string().required(),
	force: Joi.boolean().required(),
})

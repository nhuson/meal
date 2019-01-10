import { Router } from 'express'
const router = Router()
import requireAuth from '../middleware/auth'
import SchemaValidator from '../middleware/schemaValidator'
const validateRequest = SchemaValidator(true)

const asyncMiddleware = (fn) => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next)
	}
}

const pickHandler = (handlerDef) => {
	const [handlerFile, handlerMethod] = handlerDef.split('@')
	return asyncMiddleware(require(`../controllers/${handlerFile}`)[handlerMethod])
}

//all routes are here
router.post('/auth/signup', validateRequest, pickHandler('auth.controller@signup'))
router.post('/auth/login', validateRequest, pickHandler('auth.controller@login'))
router.post('/auth/forgot-password',validateRequest,pickHandler('auth.controller@forgotPassword'))
router.post('/auth/reset-password',validateRequest,pickHandler('auth.controller@resetPassword'))

// Type ingredient
router.get('/type-ingredient', requireAuth, pickHandler('typeIngredient.controller@getAll'))
	.post('/type-ingredient', requireAuth, validateRequest, pickHandler('typeIngredient.controller@create'))
	.put('/type-ingredient/:id', requireAuth, validateRequest, pickHandler('typeIngredient.controller@update'))
	.delete('/type-ingredient/:id', requireAuth, pickHandler('typeIngredient.controller@deleteType'))

export default router
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
router.get('/ping', (req, res, next) => { res.json(200, { message: 'pong' }) })
router.post('/auth/signup', validateRequest, pickHandler('auth.controller@signup'))
router.post('/auth/login', validateRequest, pickHandler('auth.controller@login'))
router.post('/auth/forgot-password',validateRequest,pickHandler('auth.controller@forgotPassword'))
router.post('/auth/reset-password',validateRequest,pickHandler('auth.controller@resetPassword'))

// Type ingredient
router.get('/type-ingredient', requireAuth, pickHandler('typeIngredient.controller@getAll'))
	.post('/type-ingredient', requireAuth, validateRequest, pickHandler('typeIngredient.controller@create'))
	.put('/type-ingredient/:id', requireAuth, validateRequest, pickHandler('typeIngredient.controller@update'))
	.delete('/type-ingredient/:id', requireAuth, pickHandler('typeIngredient.controller@deleteType'))

// Ingredient
router.get('/ingredient', requireAuthAdmin, pickHandler('ingredient.controller@getAll'))
	.post('/ingredient', requireAuthAdmin, validateRequest, pickHandler('ingredient.controller@create'))
	.put('/ingredient/:id', requireAuthAdmin, validateRequest, pickHandler('ingredient.controller@update'))
	.delete('/ingredient/:id', requireAuthAdmin, pickHandler('ingredient.controller@deleteType'))
	.post('/ingredient-csv', requireAuthAdmin, pickHandler('ingredient.controller@importCsv'))

// Page
router.get('/page', requireAuthAdmin, pickHandler('page.controller@getAll'))
.post('/page', requireAuthAdmin, validateRequest, pickHandler('page.controller@create'))
.put('/page/:id', requireAuthAdmin, validateRequest, pickHandler('page.controller@update'))
.delete('/page/:id', requireAuthAdmin, pickHandler('page.controller@remove'))

// Versions
router.get('/version', requireAuthAdmin, pickHandler('version.controller@getAll'))
.put('/version/:id', requireAuthAdmin, validateRequest, pickHandler('version.controller@update'))

// import upload from '../utils/uploadS3'	
// router.post('/test-upload', async (req, res, next) => {
// 	console.log(await upload.push([req.files.upload], 'test'))
// 	res.status(200).json("aaa")
// })
export default router

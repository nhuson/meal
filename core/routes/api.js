import {
	Router
} from 'express'
const router = Router()
import {
	requireAuth,
	requireAdminAuth
} from '../middleware/auth'
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
router.get('/ping', (req, res, next) => {
	res.json(200, {
		message: 'pong'
	})
})
router.post('/auth/signup', validateRequest, pickHandler('auth.controller@signup'))
router.post('/auth/login', validateRequest, pickHandler('auth.controller@login'))
router.post('/auth/forgot-password', validateRequest, pickHandler('auth.controller@forgotPassword'))
router.post('/auth/reset-password', validateRequest, pickHandler('auth.controller@resetPassword'))

// Type ingredient
router.get('/type-ingredient', requireAdminAuth, pickHandler('typeIngredient.controller@getAll'))
	.post('/type-ingredient', requireAdminAuth, validateRequest, pickHandler('typeIngredient.controller@create'))
	.put('/type-ingredient/:id', requireAdminAuth, validateRequest, pickHandler('typeIngredient.controller@update'))
	.delete('/type-ingredient/:id', requireAdminAuth, pickHandler('typeIngredient.controller@deleteType'))

// Ingredient
router.get('/ingredient', requireAdminAuth, pickHandler('ingredient.controller@getAll'))
	.post('/ingredient', requireAdminAuth, validateRequest, pickHandler('ingredient.controller@create'))
	.put('/ingredient/:id', requireAdminAuth, validateRequest, pickHandler('ingredient.controller@update'))
	.delete('/ingredient/:id', requireAdminAuth, pickHandler('ingredient.controller@deleteType'))
	.post('/ingredient-csv', requireAdminAuth, pickHandler('ingredient.controller@importCsv'))


//Category
router.get('/category', requireAuth, pickHandler('category.controller@getAll'))
	.post('/category', requireAdminAuth, validateRequest, pickHandler('category.controller@create'))
	.put('/category/:id', requireAdminAuth, validateRequest, pickHandler('category.controller@update'))
	.delete('/category/:id', requireAdminAuth, pickHandler('category.controller@remove'))

// Page
router.get('/page', requireAdminAuth, pickHandler('page.controller@getAll'))
	.post('/page', requireAdminAuth, validateRequest, pickHandler('page.controller@create'))
	.put('/page/:id', requireAdminAuth, validateRequest, pickHandler('page.controller@update'))
	.delete('/page/:id', requireAdminAuth, pickHandler('page.controller@remove'))

// Versions
router.get('/version', requireAdminAuth, pickHandler('version.controller@getAll'))
	.put('/version/:id', requireAdminAuth, validateRequest, pickHandler('version.controller@update'))


// import upload from '../utils/uploadS3'
// router.post('/test-upload', async (req, res, next) => {
// 	console.log(await upload.push([req.files.upload], 'test'))
// 	res.status(200).json("aaa")
// })


export default router

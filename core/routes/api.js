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
router.get('/ping', (req, res, next) => {
	res.json(200, {
		message: 'pong'
	})
})
router.post('/auth/signup', validateRequest, pickHandler('auth.controller@signup'))
router.post('/auth/login', validateRequest, pickHandler('auth.controller@login'))
router.post(
	'/auth/forgot-password',
	validateRequest,
	pickHandler('auth.controller@forgotPassword')
)
router.post(
	'/auth/reset-password',
	validateRequest,
	pickHandler('auth.controller@resetPassword')
)
router.post('/auth/login-facebook', pickHandler('auth.controller@loginFacebook'))

// Type ingredient
router
	.get(
		'/type-ingredient',
		requireAuth(),
		pickHandler('typeIngredient.controller@getAll')
	)
	.post(
		'/type-ingredient',
		requireAuth('admin'),
		validateRequest,
		pickHandler('typeIngredient.controller@create')
	)
	.put(
		'/type-ingredient/:id',
		requireAuth('admin'),
		validateRequest,
		pickHandler('typeIngredient.controller@update')
	)
	.delete(
		'/type-ingredient/:id',
		requireAuth('admin'),
		pickHandler('typeIngredient.controller@deleteType')
	)

// Ingredient
router
	.get('/ingredient', requireAuth(), pickHandler('ingredient.controller@getAll'))
	.post(
		'/ingredient',
		requireAuth('admin'),
		validateRequest,
		pickHandler('ingredient.controller@create')
	)
	.put(
		'/ingredient/:id',
		requireAuth('admin'),
		validateRequest,
		pickHandler('ingredient.controller@update')
	)
	.delete(
		'/ingredient/:id',
		requireAuth('admin'),
		pickHandler('ingredient.controller@remove')
	)
	.post(
		'/ingredient-csv',
		requireAuth('admin'),
		pickHandler('ingredient.controller@importCsv')
	)

//Category
router
	.get('/category', requireAuth(), pickHandler('category.controller@getAll'))
	.post(
		'/category',
		requireAuth('admin'),
		validateRequest,
		pickHandler('category.controller@create')
	)
	.put(
		'/category/:id',
		requireAuth('admin'),
		validateRequest,
		pickHandler('category.controller@update')
	)
	.delete(
		'/category/:id',
		requireAuth('admin'),
		pickHandler('category.controller@remove')
	)

// Page
router
	.get('/page', requireAuth('admin'), pickHandler('page.controller@getAll'))
	.post(
		'/page',
		requireAuth('admin'),
		validateRequest,
		pickHandler('page.controller@create')
	)
	.put(
		'/page/:id',
		requireAuth('admin'),
		validateRequest,
		pickHandler('page.controller@update')
	)
	.delete('/page/:id', requireAuth('admin'), pickHandler('page.controller@remove'))

// Contact
router
	.get('/contact', requireAuth('admin'), pickHandler('contact.controller@getAll'))
	.post(
		'/contact',
		requireAuth(),
		validateRequest,
		pickHandler('contact.controller@create')
	)
	.delete(
		'/contact/:id',
		requireAuth('admin'),
		pickHandler('contact.controller@remove')
	)

// Versions
router
	.get('/version', requireAuth(), pickHandler('version.controller@getAll'))
	.put(
		'/version/:id',
		requireAuth('admin'),
		validateRequest,
		pickHandler('version.controller@update')
	)

//MenuType
router
	.get('/menu-type', requireAuth(), pickHandler('menuType.controller@getAll'))
	.post(
		'/menu-type',
		requireAuth('admin'),
		validateRequest,
		pickHandler('menuType.controller@create')
	)
	.put(
		'/menu-type/:id',
		requireAuth('admin'),
		validateRequest,
		pickHandler('menuType.controller@update')
	)
	.delete(
		'/menu-type/:id',
		requireAuth('admin'),
		pickHandler('menuType.controller@remove')
	)

//AllergiType
router
	.get('/allergy-type', requireAuth(), pickHandler('allergyType.controller@getAll'))
	.post(
		'/allergy-type',
		requireAuth('admin'),
		validateRequest,
		pickHandler('allergyType.controller@create')
	)
	.put(
		'/allergy-type/:id',
		requireAuth('admin'),
		validateRequest,
		pickHandler('allergyType.controller@update')
	)
	.delete(
		'/allergy-type/:id',
		requireAuth('admin'),
		pickHandler('allergyType.controller@remove')
	)

//Meal
router
	.get('/meal', requireAuth(), pickHandler('meal.controller@getAll'))
	.post(
		'/meal',
		requireAuth('admin'),
		validateRequest,
		pickHandler('meal.controller@create')
	)
	.put(
		'/meal/:id',
		requireAuth('admin'),
		validateRequest,
		pickHandler('meal.controller@update')
	)
	.delete('/meal/:id', requireAuth('admin'), pickHandler('meal.controller@remove'))
	.get(
		'/meal_by_page',
		requireAuth('admin'),
		pickHandler('meal.controller@getMealsByPage')
	)
	.get(
		'/meal/ingredient/:id',
		requireAuth('admin'),
		pickHandler('meal.controller@getIngredientByMealId')
	)
	.post(
		'/meal/add_favorite',
		validateRequest,
		requireAuth(),
		pickHandler('meal.controller@addFavorite')
	)
	.delete(
		'/meal_remove_favorite',
		validateRequest,
		requireAuth(),
		pickHandler('meal.controller@removeFavorite')
	)
	.get(
		'/meal/get_favorite_by_user',
		requireAuth(),
		pickHandler('meal.controller@getMealFavoriteByUser')
	)
	.post(
		'/meal/meal_plan',
		requireAuth(),
		validateRequest,
		pickHandler('meal.controller@createMealPlan')
	)
	.put(
		'/meal/meal_plan/edit',
		requireAuth(),
		pickHandler('meal.controller@editMealPlan')
	)
	.get(
		'/meal/get_meal_by_day/:date',
		requireAuth(),
		pickHandler('meal.controller@getMealByDay')
	)
	.get(
		'/meal/get_meal_by_user_id',
		requireAuth(),
		pickHandler('meal.controller@getMealByUserId')
	)
	.get(
		'/meal/get_meal_range_day/:from/:to',
		requireAuth(),
		pickHandler('meal.controller@getMealRangeDay')
	)
//Users
router
	.get('/users', requireAuth('admin'), pickHandler('user.controller@getUser'))
	.put(
		'/users/:id',
		requireAuth(),
		validateRequest,
		pickHandler('user.controller@updateUser')
	)
	.post(
		'/users/setting',
		validateRequest,
		requireAuth(),
		pickHandler('user.controller@updateUserSetting')
	)
	.get('/users/setting', requireAuth(), pickHandler('user.controller@getUserSetting'))
//upload
router.post('/upload/:location', pickHandler('upload.controller@upload'))

export default router

import signupSchema from './signup.schema'
import loginSchema from './login.schema'
import forgotPassSchema from './forgot_pass.schema'
import resetPassSchema from './reset_pass.schema'
import typeIngredientSchema from './type_ingredient.schema'
import ingredientSchema from './ingredient.schema'
import pageSchema from './page.schema'
import versionSchema from './versions.schema'
import categorySchema from './category.schema'
import contactSchema from './contact.schema'
import menuTypeSchema from './menu_type.schema'
import allergiTypeSchema from './allergiType.schema'
import mealSchema from './meal.schema'
import mealCalendarSchema from './meal.calendar.schema'
import mealFavoriteSchema from './meal.favorite.schema'
import userUpdateSchema from './user.update.schema'

module.exports = {
	'/auth/signup': signupSchema,
	'/auth/login': loginSchema,
	'/auth/forgot-password': forgotPassSchema,
	'/auth/reset-password': resetPassSchema,
	'/type-ingredient': typeIngredientSchema,
	'/ingredient': ingredientSchema,
	'/page': pageSchema,
	'/version': versionSchema,
	'/category': categorySchema,
	'/contact': contactSchema,
	'/menu-type': menuTypeSchema,
	'/allergi-type': allergiTypeSchema,
	'/meal': mealSchema,
	'/users/meal_calendar': mealCalendarSchema,
	'/meal/add_favorite': mealFavoriteSchema,
	'/meal_remove_favorite': mealFavoriteSchema,
	'/users/:id': userUpdateSchema,
}

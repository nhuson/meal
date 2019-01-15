import signupSchema from './signup.schema'
import loginSchema from './login.schema'
import forgotPassSchema from './forgotPass.schema'
import resetPassSchema from './resetPass.schema'
import typeIngredientSchema from './type_ingredient.schema'
import ingredientSchema from './ingredient.schema'
import pageSchema from './page.schema'
import versionSchema from './versions.schema'

module.exports = {
	'/auth/signup': signupSchema,
	'/auth/login': loginSchema,
	'/auth/forgot-password': forgotPassSchema,
	'/auth/reset-password': resetPassSchema,
	'/type-ingredient': typeIngredientSchema,
	'/ingredient': ingredientSchema,
	'/page': pageSchema,
	'/version': versionSchema,
}
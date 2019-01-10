import signupSchema from './signup.schema'
import loginSchema from './login.schema'
import forgotPassSchema from './forgotPass.schema'
import resetPassSchema from './resetPass.schema'
import typeIngredientSchema from './type_ingredient.schema'

module.exports = {
	'/auth/signup': signupSchema,
	'/auth/login': loginSchema,
	'/auth/forgot-password': forgotPassSchema,
	'/auth/reset-password': resetPassSchema,
	'/type-ingredient': typeIngredientSchema
}
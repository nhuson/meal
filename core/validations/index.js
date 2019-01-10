import signupSchema from './signup.schema'
import loginSchema from './login.schema'
import typeIngredientSchema from './type_ingredient.schema'

module.exports = {
	'/auth/signup': signupSchema,
	'/auth/login': loginSchema,
	'/type-ingredient': typeIngredientSchema
}

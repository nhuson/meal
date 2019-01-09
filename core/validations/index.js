import signupSchema from './signup.schema'
import loginSchema from './login.schema'

module.exports = {
    '/auth/signup': signupSchema,
    '/auth/login': loginSchema
}
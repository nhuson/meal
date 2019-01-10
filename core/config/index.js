const dotenv = require('dotenv')

const configs = {
	development: { config: 'dev', env: '.env.local' },
	production: { config: 'prod', env: '.env.prod' },
}

const currentEnvironment = process.env.NODE_ENV || 'development'
const envPath = configs[currentEnvironment].env

console.log(`Loading .env from '${envPath}'`)
dotenv.config({ path: envPath })

const _default = {
	server: {
		port: process.env.API_PORT,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		algorithm: process.env.JWT_ALGORITHM,
	},
}

const config = require(`./${configs[currentEnvironment].config}`)
module.exports = Object.assign({ env: currentEnvironment }, _default, config)

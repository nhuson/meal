const configs = require('./config')

module.exports = {
	development: {
		client: configs.database.connection,
		connection: {
			host: configs.database.host,
			user: configs.database.username,
			password: configs.database.password,
			database: configs.database.name,
		},
		useNullAsDefault: true,
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
	},
}

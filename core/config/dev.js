module.exports = {
	database: {
		connection: process.env.DB_CONNECTION,
		host: process.env.DB_HOST,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_DATABASE,
	},
	s3: {
		BUCKET_NAME: '',
	},
	redis: {
		host: process.env.REDIS_HOST,
		password: process.env.REDIS_PASSWORD,
		port: process.env.REDIS_PORT,
		db: process.env.REDIS_DB,
		prefix: process.env.REDIS_PREFIX,
		timetolive: 86400,
	},
	redis_key: {
		meal: {
			hash: 'meal',
			favorite_key: 'favorite_data',
		},
	},
}

module.exports = {
	database: {
		connection: process.env.DB_CONNECTION,
		host: process.env.DB_HOST,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_DATABASE,
	},
};

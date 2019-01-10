const statusUser = {
	BLOCKED: 1,
	ACTIVE: 0
}

module.exports = {
	database: {
		connection: process.env.DB_CONNECTION,
		host: process.env.DB_HOST,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_DATABASE,
	},
<<<<<<< HEAD
}
=======
	statusUser
};
>>>>>>> 32ff4f2c50f3dcc5c491738342e0f1de203b8c16

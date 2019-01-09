import configs from '../config';
const config = {
	client: configs.database.connection,
	connection: {
		host: configs.database.host,
		user: configs.database.username,
		password: configs.database.password,
		database: configs.database.name,
	},
};

const knex = require('knex')(config);
export default knex;

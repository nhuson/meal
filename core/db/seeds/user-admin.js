exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users').insert([
		{
			id: 1,
			firstname: 'Nhu',
			lastname: 'Son',
			email: 'nhuson@gmail.com',
			password: '$2a$05$iBjSCrytZOUu57eXn2lLG.svHvJKG7Hk4tef37Ts2.hs/of4MtNnS',
			avatar: 'users/avatar/bd3aaa1cf78d4921821c11f2e5e44bc11548138505844.jpeg',
			role: 'admin',
		},
	])
}

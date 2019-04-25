exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function(t) {
		t.increments('id')
			.unsigned()
			.primary()
		t.timestamps(true, true)
		t.string('firstname', 50)
			.index()
			.notNull()
		t.string('lastname', 50)
			.index()
			.notNull()
		t.string('email', 100)
			.index()
			.nullable()
		t.string('password', 100).notNull()
		t.string('avatar', 250).nullable()
		t.string('provider', 20).nullable()
		t.string('provider_id', 100).nullable()
		t.specificType('status', 'smallint').default(1)
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users')
}

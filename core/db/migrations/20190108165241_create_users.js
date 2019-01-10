exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function(t) {
		t.increments('id')
			.unsigned()
			.primary();
		t.timestamps();
		t.string('firstname', 50).index().notNull();
		t.string('lastname', 50).index().notNull();
		t.string('email', 100).index().notNull();
		t.string('password', 100).notNull();
		t.string('avatar', 100).nullable();
		t.specificType('status', 'tinyint(1)').default(0)
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('users');
};

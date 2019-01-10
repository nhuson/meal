exports.up = function(knex, Promise) {
	return knex.schema.createTable('admin_users', function(t) {
		t.increments('id')
			.unsigned()
			.primary();
		t.timestamps(true, true);
		t.string('firstname').notNull();
		t.string('lastname');
		t.string('email').notNull();
		t.string('password').notNull();
		t.string('avatar').nullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('admin_users');
};

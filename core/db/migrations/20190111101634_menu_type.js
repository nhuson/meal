exports.up = function(knex, Promise) {
	return knex.schema.createTable('menu_types', function(t) {
		t.increments('id')
			.unsigned()
			.primary();
		t.timestamps();
        t.string('title', 45).index().notNull();
        t.text('description').nullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('menu_types');
};

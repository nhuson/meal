exports.up = function(knex, Promise) {
	return knex.schema.createTable('type_ingredients', function(t) {
		t.increments('id')
			.unsigned()
			.primary();
		t.timestamps(true, true);
		t.string('title', 100).index().notNull();
        t.text('description').nullable();
        t.string('image', 100).nullable()
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('type_ingredients');
};

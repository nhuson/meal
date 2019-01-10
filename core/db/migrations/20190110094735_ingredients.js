exports.up = function(knex, Promise) {
	return knex.schema.createTable('ingredients', function(t) {
		t.increments('id')
			.unsigned()
			.primary();
		t.timestamps();
        t.string('title', 100).index().notNull()
        t.string('image', 100).notNull()
        t.text('description').notNull()
        t.string('unit', 100).index().notNull()
        t.integer('type_id').unsigned().notNull();
        t.foreign('type_id').references('id').inTable('type_ingredients');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('ingredients');
};

exports.up = function(knex, Promise) {
	return knex.schema.createTable('pages', function(t) {
		t.increments('id')
			.unsigned()
			.primary();
		t.timestamps();
        t.string('title', 45).index().notNull();
        t.string('type', 45).index().notNull();
        t.text('description').index().notNull();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('pages');
};

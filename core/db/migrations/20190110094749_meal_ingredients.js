exports.up = function(knex, Promise) {
	return knex.schema.createTable('meal_ingredients', function(t) {
		t.increments('id')
			.unsigned()
			.primary();
        t.timestamps();
        t.integer('amount').notNull();
        t.integer('meal_id').unsigned().notNull().index();
        t.foreign('meal_id').references('id').inTable('meals');
        t.integer('ingre_id').unsigned().notNull().index();
        t.foreign('ingre_id').references('id').inTable('ingredients');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('meal_ingredients');
};

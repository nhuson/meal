exports.up = function(knex, Promise) {
	return knex.schema.createTable('user_meal_favorite', function(t) {
		t.increments('id')
			.unsigned()
			.primary()
		t.timestamps(true, true)
		t.integer('user_id')
			.unsigned()
			.notNull()
		t.foreign('user_id')
			.references('id')
			.inTable('users')
		t.integer('meal_id')
			.unsigned()
			.notNull()
		t.foreign('meal_id')
			.references('id')
			.inTable('meals')
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('user_meal_favorite')
}

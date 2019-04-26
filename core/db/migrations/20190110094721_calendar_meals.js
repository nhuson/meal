exports.up = function(knex, Promise) {
	return knex.schema.createTable('calendar_meals', function(t) {
		t.increments('id')
			.unsigned()
			.primary()
		t.timestamps(true, true)
		t.integer('date')
			.notNull()
			.index()
		t.specificType('status', 'smallint').default(0)
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
	return knex.schema.dropTable('calendar_meals')
}

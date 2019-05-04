exports.up = function(knex, Promise) {
	return knex.schema.createTable('user_configs', function(t) {
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
		t.integer('menu_type')
			.unsigned()
			.notNull()
		t.foreign('menu_type')
			.references('id')
			.inTable('menu_types')
		t.integer('meal_size').notNull()
		t.json('allergy')
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('user_configs')
}

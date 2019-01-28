exports.up = function(knex, Promise) {
	return knex.schema.createTable('categories', function(t) {
		t.increments('id')
			.unsigned()
			.primary()
		t.timestamps(true, true)
		t.string('title', 100)
			.index()
			.notNull()
		t.text('description').notNull()
		t.string('image', 100).nullable()
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('categories')
}

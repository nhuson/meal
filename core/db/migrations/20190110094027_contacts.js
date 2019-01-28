exports.up = function(knex, Promise) {
	return knex.schema.createTable('contacts', function(t) {
		t.increments('id')
			.unsigned()
			.primary()
		t.timestamps(true, true)
		t.string('title', 100)
			.index()
			.notNull()
		t.text('messages').notNull()
		t.integer('user_id')
			.unsigned()
			.notNull()
		t.foreign('user_id')
			.references('id')
			.inTable('users')
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('contacts')
}

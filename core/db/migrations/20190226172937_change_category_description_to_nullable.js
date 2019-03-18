
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('categories', function(t) {
		t.text('description').nullable().alter()
	})
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('categories', function(t) {
		t.text('description').notNullable().alter()
	})
};

exports.up = function(knex, Promise) {
	return knex.schema.createTable('versions', function(t) {
		t.increments('id')
			.unsigned()
			.primary();
		t.timestamps(true, true);
        t.string('version', 40).index().notNull();
        t.string('os', 40).index().notNull();
        t.string('url', 100).index().notNull();
        t.specificType('force', 'tinyint(1)').default(0)
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('versions');
};

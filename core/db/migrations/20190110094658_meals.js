exports.up = function(knex, Promise) {
	return knex.schema.createTable('meals', function(t) {
		t.increments('id')
			.unsigned()
			.primary();
		t.timestamps(true, true);
        t.string('title', 100).index().notNull();
        t.json('instruction').notNull();
        t.string('image', 100).notNull();
        t.integer('time').notNull();
        t.integer('serving').notNull();
        t.integer('calorie').nullable()
        t.integer('count_rate').nullable()
        t.integer('rate').nullable()
        t.json('album').nullable()
        t.specificType('is_pro', 'tinyint(1)').default(0)
        t.integer('cate_id').unsigned().notNull();
        t.foreign('cate_id').references('id').inTable('categories');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('meals');
};

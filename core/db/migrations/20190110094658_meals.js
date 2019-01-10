exports.up = function(knex, Promise) {
	return knex.schema.createTable('meals', function(t) {
		t.increments('id')
			.unsigned()
			.primary();
		t.timestamps();
        t.string('title', 100).index().notNull();
        t.json('instruction').index().notNull();
        t.string('image', 100).index().notNull();
        t.integer('time').index().notNull();
        t.integer('serving').index().notNull();
        t.integer('calorie').index().nullable()
        t.integer('count_rate').index().nullable()
        t.integer('rate').index().nullable()
        t.json('album').index().nullable()
        t.specificType('is_pro', 'tinyint(1)').default(0)
        t.integer('cate_id').unsigned().notNull();
        t.foreign('cate_id').references('id').inTable('categories');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('meals');
};


exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(t) {
        t.increments('id').unsigned().primary();
        t.timestamps();
        t.string('firstname').notNull();
        t.string('lastname')
        t.string('email').notNull();
        t.string('password').notNull();
        t.string('avatar')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};

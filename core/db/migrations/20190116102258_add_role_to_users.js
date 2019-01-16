
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.string('role').default('USER');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.dropColumn('role');
    });
};

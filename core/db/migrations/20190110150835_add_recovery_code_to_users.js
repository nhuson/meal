
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.string('recovery_code', 100).nullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.dropColumn('recovery_code');
    });
};

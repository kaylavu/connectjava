
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('milestones', function(table) {
           table.integer('famous_personid').unsigned(); 
           table.foreign('famous_personid').references('famous_people.id')
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table.dropForeign('famous_personid')
    ])
};

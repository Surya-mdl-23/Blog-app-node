const knex = require('./connection')

async function createTables() {
    await knex.schema.createTable('user', function(table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
});
    await knex.schema.createTable('post', function(table) {
        table.string('id').primary();
        table.string('title').notNullable();
        table.string('content').notNullable();
        table.string('author').notNullable();
    })
}
createTables();

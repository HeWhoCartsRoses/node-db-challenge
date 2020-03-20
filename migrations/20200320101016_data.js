exports.up = function (knex) {
    return knex.schema
        .createTable("projects", tbl => {
            tbl.increments();
            tbl
                .string("name", 255)
                .notNullable()
                .unique();
            tbl.string('decription')
            tbl.boolean('completed').notNullable().defaultTo(false)
        })
        .createTable("tasks", tbl => {
            tbl.increments();
            tbl.string("description", 255).notNullable();
            tbl.string('notes', 255);
            tbl.boolean('completed').notNullable().defaultTo(false)
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable("resources", tbl => {
            tbl.increments();
            tbl
                .string("name", 255)
                .notNullable()
            tbl.string('description')
        })
        .createTable("item-projects", tbl => {
            tbl.primary(["resource_id", "project_id"]);
            tbl
                .integer("resource_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("resources")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE"); // CASCADE, RESTRICT, DO NOTHING, SET NULL
            tbl
                .integer("project_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("projects")
                .onDelete("RESTRICT")
                .onUpdate("CASCADE"); // CASCADE, RESTRICT, DO NOTHING, SET NULL
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("item-projects")
        .dropTableIfExists("projects")
        .dropTableIfExists("tasks")
        .dropTableIfExists("resources");
};
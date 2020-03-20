const db = require("../data/db-config.js");
module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
};

function find() {
    return db("tasks");
}

function findById(id) {
    return db("tasks")
        .where({
            id
        })
        .first();
}

function findSteps(id) {
    return db('steps')
        .where({
            scheme_id: id
        })
        .orderBy('step_number')
}

function add(scheme) {
    return db('tasks')
        .insert(scheme)
}

function update(id, changes) {
    return db("tasks")
        .where({
            id
        })
        .update(changes)
        .then(() => {
            return findById(id);
        });
}

function remove(id) {
    let that = findById(id)
    return db('tasks')
        .where({
            id
        })
        .del()
        .then(() => {
            return that
        })
        .catch(() => {
            return null
        })
}
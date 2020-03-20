const express = require('express');

const Resource = require('./routes/resource-router.js');
const Task = require('./routes/task-router')
const Project = require('./routes/project-router')
const server = express();

server.use(express.json());
server.use('/api/resources', Resource);
server.use('/api/tasks', Task);
server.use('/api/projects', Project);
module.exports = server;
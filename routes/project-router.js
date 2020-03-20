const express = require('express');
const Project = require('./project-model.js');
const router = express.Router();
router.get('/', (req, res) => {
    Project.find()
        .then(Project => {
            res.json(Project);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get Project'
            });
        });
});

router.get('/:id', (req, res) => {
    const {
        id
    } = req.params;

    Project.findById(id)
        .then(scheme => {
            if (scheme) {
                res.json(scheme);
            } else {
                res.status(404).json({
                    message: 'Could not find scheme with given id.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get Project'
            });
        });
});

router.get('/:id/resources', (req, res) => {
    const {
        id
    } = req.params;

    Project.findResources(id)
        .then(steps => {
            if (steps.length) {
                res.json(steps);
            } else {
                res.status(404).json({
                    message: 'Could not find steps for given scheme'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get steps'
            });
        });
});
router.get('/:id/tasks', (req, res) => {
    const {
        id
    } = req.params;

    Project.findTasks(id)
        .then(steps => {
            if (steps.length) {
                res.json(steps);
            } else {
                res.status(404).json({
                    message: 'Could not find steps for given scheme'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get steps'
            });
        });
});
router.post('/', (req, res) => {
    Project.add(req.body)
        .then(scheme => {
            res.status(201).json(scheme);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create new scheme'
            });
        });
});
module.exports = router;
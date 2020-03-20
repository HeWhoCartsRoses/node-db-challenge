const express = require('express');
const Resource = require('./resource-model');
const router = express.Router();
router.get('/', (req, res) => {
    Resource.find()
        .then(Resource => {
            res.json(Resource);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get Resource'
            });
        });
});

router.get('/:id', (req, res) => {
    const {
        id
    } = req.params;

    Resource.findById(id)
        .then(resource => {
            if (resource) {
                res.json(resource);
            } else {
                res.status(404).json({
                    message: 'Could not find resource with given id.'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get Resource'
            });
        });
});
router.get('/:id/projects', (req, res) => {
    const {
        id
    } = req.params;

    Resource.findProjects(id)
        .then(steps => {
            if (steps.length) {
                res.json(steps);
            } else {
                res.status(404).json({
                    message: 'Could not find steps for given Router'
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
    Resource.add(req.body)
        .then(resource => {
            res.status(201).json(resource);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to create new resource'
            });
        });
});
module.exports = router;
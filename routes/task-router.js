const express = require('express');
const Schemes = require('./task-model');
const router = express.Router();
router.get('/', (req, res) => {
    Schemes.find()
        .then(schemes => {
            res.json(schemes);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to get schemes'
            });
        });
});
router.post('/', (req, res) => {
    Schemes.add(req.body)
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
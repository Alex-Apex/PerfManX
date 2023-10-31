const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Routes
router.use('/test', (req, res) => {
    res.send('<div>Test<div>');
});

router.use('/myOrg', (req, res) => {
    res.send('BLAH');
});

router.get('/', homeController.getHomePage);

module.exports = router;

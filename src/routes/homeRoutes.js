const express = require('express');
const router = express.Router();

// Routes
router.use('/test', (req, res) => {    
    res.send('<div>Test<div>');
});

router.get('/', (req, res) => {
    res.render('home', { message: 'PerfManX' });
});

module.exports = router;

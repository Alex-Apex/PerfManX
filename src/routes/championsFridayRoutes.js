const express = require('express');
const router = express.Router();
const championsFridayController = require('../controllers/championsFridayController');

// Routes
router.use('/foc', (req, res) => {
    res.send('<div>Test in Champions Friday Home<div>');
});

router.get('/', championsFridayController.getHomePage);
router.get('/register_champion', championsFridayController.getChampionRegistrationPage);
router.post('/register_champion', championsFridayController.postChampionRegistration);
module.exports = router;
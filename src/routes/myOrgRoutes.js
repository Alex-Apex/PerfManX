const express = require('express');
const router = express.Router();
const myOrgController = require('../controllers/myOrgController');


router.get('/', myOrgController.getMyOrgPage);

module.exports = router;

const express = require('express');
const { createService } = require('../controllers/serviceController');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

router.post('/addservices', createService);
router.get('/getservices', serviceController.getServices);


module.exports = router;

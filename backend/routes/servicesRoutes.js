const express = require('express');
const { createService } = require('../controllers/servicesController');
const serviceController = require('../controllers/servicesController');

const router = express.Router();

router.post('/addservices', createService);
router.get('/getservices', serviceController.getServices);
router.delete('/:id',serviceController.deletService)


module.exports = router;
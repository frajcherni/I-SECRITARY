const express = require('express');
const professionController = require('../controllers/professionController');

const router = express.Router();

router.post('/api/professions', professionController.createProfession);
router.get('/api/professions', professionController.getProfessions);


module.exports = router;
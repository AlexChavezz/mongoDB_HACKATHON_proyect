const { Router } = require('express');
const { getQuestion } = require('../controllers/questions.controllers');
const router = Router();
router.get('/getQuestion', getQuestion)
module.exports = router;

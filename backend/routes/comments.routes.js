const { Router } = require('express');
const router = Router();
const { saveComment } = require('../controllers/comment.controllers');


router.post('/publish-comment', saveComment)



module.exports = router;
const { Router } = require('express'); 
const { isUserExist } = require('../controllers/users.controlles');

const router = Router();
router.get('/validateIfExistsByAutoComplete/:userName', isUserExist);

module.exports = router;
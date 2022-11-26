const { Router } = require('express'); 
const { isUserExist, saveUser, getUser } = require('../controllers/users.controlles');

const router = Router();
router.get('/validateIfExistsByAutoComplete/:userName', isUserExist);
router.post('/saveUser', saveUser);
router.get('/getUser', getUser);
module.exports = router;
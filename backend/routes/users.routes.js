const { Router } = require('express'); 
const { isUserExist, saveUser, getUser } = require('../controllers/users.controlles');
const { check } = require('express-validator');


const router = Router();
router.post('/get-user',[
    check('userName', 'User name is required').not().isEmpty(),
    check ('password','password is required and length should be greater than 6').isLength({ min:6 })
], getUser);
router.post('/save-user', [
    check('userName', 'userName is required').not().isEmpty(),
    check('password', 'password is required and length should be greater than 6').isLength({ min: 6 }),
] ,saveUser);
router.get('/validate-if-exists-by-autocomplete/:userName', isUserExist);

module.exports = router;
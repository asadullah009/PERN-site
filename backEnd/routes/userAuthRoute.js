const { UserRegister, UserLogin } = require('../controllers/Userauth');

const router = require('express').Router();


router.post('/register', UserRegister)
router.post('/login', UserLogin)

module.exports = router
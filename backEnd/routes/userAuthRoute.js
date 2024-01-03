const { UserRegister, UserLogin, varifyToken, refreshToken, updateUserDetails, logout } = require('../controllers/userAuth');

const router = require('express').Router();

// Auth Routes
router.post('/register', UserRegister)
router.post('/login', UserLogin)

// userDeatl Routes
router.get('/user',varifyToken )
router.get('/refresh',refreshToken, varifyToken)
router.put('/Update/:id',updateUserDetails)
router.post("/logout", varifyToken, logout );







module.exports = router
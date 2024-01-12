const express = require('express');
const router = express.Router();


const {
    registerUser,
    loginUser,
    getUserProfile
} = require('../controllers/userController');
const { get } = require('mongoose');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

module.exports = router;
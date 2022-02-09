const express = require('express');
const router = express.Router();

const {
    login, 
    signup,
    updateUser,
    getUserById
} = require('../controllers/users');
router.put('/update/:userId', updateUser);

router.post('/login', login);
router.post('/signup', signup);

router.param('userId', getUserById);

module.exports = router;
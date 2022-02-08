const express = require('express');
const router = express.Router();

const {
    create, 
    orderIndex
} = require('../controllers/orders');

router.post('/create', create);
router.get('/', orderIndex);

module.exports = router;
const express = require('express');
const router = express.Router();

const {
    create, 
    subCategory,
    categoryIndex
} = require('../controllers/categories');

router.post('/create', create);
router.get('/:category', subCategory);
router.get('/', categoryIndex);

module.exports = router;
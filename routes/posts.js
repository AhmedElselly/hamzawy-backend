const express = require('express');
const router = express.Router();
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

const {
    home,
    create, 
    postId,
    postIndex,
    allProducts,
    byCategory,
    byCategories,
    getProductById,
    postUpdate,
    remove
} = require('../controllers/posts');

router.post('/create', upload.array('image', 4), create);
router.get('/byCategory/:name', byCategory);
router.get('/byCategories', byCategories);
router.get('/allProducts', allProducts);
router.get('/product/:postId', postId);
router.put('/product/:postId/update', upload.array('image', 4), postUpdate);
router.delete('/product/:postId/remove', remove);

router.get('/home', home);
router.get('/', postIndex);

router.param('postId', getProductById);

module.exports = router;
const express = require('express');
const router = express.Router();
const authService = require('../services/auth');


const blogCtrl = require('../controllers/blog');


router.get('/:id', blogCtrl.getBlogById);

router.post('', authService.checkJWT, authService.checkRole('siteOwner'), blogCtrl.createBlog);

router.patch('/:id', authService.checkJWT, authService.checkRole('siteOwner'), blogCtrl.updateBlog);


module.exports = router;
const express = require('express');
const router = express.Router();
const authService = require('../services/auth');


const blogCtrl = require('../controllers/blog');

router.post('', authService.checkJWT, authService.checkRole('siteOwner'), blogCtrl.createBlog);

router.get('/:id', blogCtrl.getBlogById);



module.exports = router;
const express = require('express');
const router = express.Router();
const authService = require('../services/auth');


const bookPortfolio = require('../controllers/portfolio');

router.post('', authService.checkJWT, authService.checkRole('siteOwner'), bookPortfolio.savePortfolio);

router.get('', authService.checkJWT, authService.checkRole('siteOwner'), bookPortfolio.getPortfolios);

module.exports = router;
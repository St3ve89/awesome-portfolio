const express = require('express');
const router = express.Router();
const authService = require('../services/auth');


const bookPortfolio = require('../controllers/portfolio');

router.post('', authService.checkJWT, authService.checkRole('siteOwner'), bookPortfolio.savePortfolio);

router.get('', bookPortfolio.getPortfolios);

router.patch('/:id',authService.checkJWT, authService.checkRole('siteOwner'), bookPortfolio.updatePortfolio);

router.delete('/:id',authService.checkJWT, authService.checkRole('siteOwner'), bookPortfolio.deletePortfolio);

module.exports = router;
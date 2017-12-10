const express = require('express');
const router = express.Router();
const Authentication = require('../controllers/authentication');
const middleware = require('../services/middleware');

router.post('/login', middleware.requireSignin, Authentication.login);
router.post('/register', Authentication.register);
router.get('/me', middleware.requireAuth, Authentication.me);

module.exports = router;
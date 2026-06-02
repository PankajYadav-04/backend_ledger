const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const createAccount = require('../controller/accountController');
router.post('/' , protect , createAccount);

module.exports = router;
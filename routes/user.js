var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user')

router.post('/', UserController.Create);
router.post('/login', UserController.Index)

module.exports = router;


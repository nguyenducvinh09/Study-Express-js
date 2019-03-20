var express = require('express')

const controller = require('../controllers/product.controller');

var router = express()

router.get('/', controller.index);

module.exports = router;
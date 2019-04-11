var express = require('express')

const controller = require('../controllers/dog.controller');

var router = express()

router.get('/add/:productId', controller.addToDog);

module.exports = router;
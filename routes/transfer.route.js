var express = require('express')

const controller = require('../controllers/transfer.controller');

var router = express()

router.get('/', controller.index);

router.post('/post', controller.postTransfer);

module.exports = router;
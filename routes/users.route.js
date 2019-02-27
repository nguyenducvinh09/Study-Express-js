var express = require('express')

const controller = require('../controllers/user.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.getId);

router.post('/create', controller.createPost);

module.exports = router;

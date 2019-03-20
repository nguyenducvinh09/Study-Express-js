var express = require('express')

const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
// const authMiddleware = require('../middlewares/auth.Middleware');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.getId);


router.post('/create', validate.postCreate, controller.createPost);

module.exports = router;

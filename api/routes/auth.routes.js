const router = require('express').Router()
const controller = require('../controllers').AuthController
const middles = require('../middlewares')

router.post('/signin', controller.signin)
router.post('/signup', middles.checkDuplicatedUsername, controller.signup)

module.exports = router
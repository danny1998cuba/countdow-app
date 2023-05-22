const router = require('express').Router()
const controller = require('../controllers').UserController
const middles = require('../middlewares')

router.get('/', middles.verifyToken, controller.obtenerUsers)
router.get('/count', controller.countUsers)
router.get('/:id', middles.verifyToken, middles.validateObjectId, controller.obtenerUser)
router.post('/change_password', middles.verifyToken, controller.changePassword)
router.put('/:id', middles.verifyToken,
    middles.validateObjectId,
    middles.checkDuplicatedUsername,
    controller.actualizarUser)
router.delete('/:id', middles.verifyToken, middles.validateObjectId, controller.eliminarUser)

module.exports = router
const router = require('express').Router()
const controller = require('../controllers').CountdownController
const middles = require('../middlewares')

router.get('/', middles.verifyToken, controller.obtenerCountdowns)
router.get('/:id', middles.validateObjectId, controller.obtenerCountdown)
router.post('/', middles.verifyToken, controller.crearCountdown)
router.put('/:id', middles.verifyToken, middles.validateObjectId, controller.actualizarCountdown)
router.delete('/:id', middles.verifyToken, middles.validateObjectId, controller.eliminarCountdown)

module.exports = router
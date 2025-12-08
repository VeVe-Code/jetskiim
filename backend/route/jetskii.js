let express = require('express')
let jetskiicontroller = require('../controller/jetskiicontroller')

let router = express.Router()

router.get('/api/jetskii',jetskiicontroller.index)

router.post('/api/jetskii', jetskiicontroller.store)

router.get('/api/jetskii/:id', jetskiicontroller.show)

router.delete('/api/jetskii/:id',jetskiicontroller.destory)
router.patch('/api/jetskii/:id',jetskiicontroller.update)

module.exports = router
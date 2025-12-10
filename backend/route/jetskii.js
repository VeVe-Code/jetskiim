let express = require('express')
let jetskiicontroller = require('../controller/jetskiicontroller')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')
const { body, validationResult } = require('express-validator');
const handleerror = require('../middleware/handleerror');



let router = express.Router()

router.get('/api/jetskii',jetskiicontroller.index)

// router.post('/api/jetskii', jetskiicontroller.store)
router.post('/api/jetskii', [body('title').notEmpty(),body('description').notEmpty()
],handleerror, upload.array("images", 4) , jetskiicontroller.store)

router.get('/api/jetskii/:id', jetskiicontroller.show)

router.delete('/api/jetskii/:id',jetskiicontroller.destory)
router.patch('/api/jetskii/:id',jetskiicontroller.update)
router.patch('/api/jetskii/:id/toggle', jetskiicontroller.toggleAvailability)
module.exports = router
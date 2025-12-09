let express = require('express')
let {protect} = require('../middleware/authMiddleware')
let usercontroller = require('../controller/usercontroller')

let router = express.Router()

router.get('/api/user',protect, usercontroller.index)


module.exports = router
// let express = require('express')
// let {protect} = require('../middleware/authMiddleware')
// let usercontroller = require('../controller/usercontroller')

// let router = express.Router()

// router.get('/api/user',protect, usercontroller.index)


// module.exports = router
const express = require("express");
const { getUserData } = require("../controller/usercontroller.js");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/api/user", protect, getUserData);

module.exports = router;
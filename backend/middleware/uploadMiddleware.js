let multer = require('multer')
let upload = multer({storage : multer.diskStorage({})})



module.exports = upload
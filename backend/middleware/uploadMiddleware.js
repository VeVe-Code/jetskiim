// let multer = require('multer')
// let upload = multer({storage : multer.diskStorage({})})



// module.exports = upload
// const multer = require("multer");

// const storage = multer.memoryStorage();  // <<< IMPORTANT

// const upload = multer({ storage });

// module.exports = upload;

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
let express = require('express');
let jetskiicontroller = require('../controller/jetskiicontroller');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { body } = require('express-validator');
const handleerror = require('../middleware/handleerror');

let router = express.Router();

// Get all jetskii
router.get('/api/jetskii', jetskiicontroller.index);

// Create jetskii (MUST be logged in)
router.post(
  '/api/jetskii',
  // protect,                        // ✅ Fix: add protect so req.user exists
  upload.array("images", 4),
  [
    body('title').notEmpty(),
    body('description').notEmpty()
  ],
  handleerror,
  jetskiicontroller.store
);

// Get one
router.get('/api/jetskii/:id', jetskiicontroller.show);

// Delete (must be logged in)
router.delete('/api/jetskii/:id', protect, jetskiicontroller.destory);

// Update (must be logged in)
router.patch('/api/jetskii/:id', protect, jetskiicontroller.update);

// Toggle availability (must be logged in)
router.patch('/api/jetskii/:id/toggle', jetskiicontroller.toggleAvailability);

module.exports = router;


const getUserData = (req, res) => {
  try {
    res.set("Cache-Control", "no-store");

    return res.json({
      success: true,
      userId: req.user.clerkId,
      role: req.user.role, // ✅ MongoDB role
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getUserData };


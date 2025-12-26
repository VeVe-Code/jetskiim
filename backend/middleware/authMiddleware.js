
// const UserModel = require("../model/User");

// const protect = async (req, res, next) => {
//   try {
//     const { userId } = req.auth; // ✅ clerkId from auth

//     if (!userId) return res.status(401).json({ success: false, message: "Not authenticated" });

//     const user = await UserModel.findOne({ clerkId: userId });

//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     req.user = user; // ✅ MongoDB user
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ success: false, message: "Authentication error" });
//   }
// };

// module.exports = { protect };
const UserModel = require("../model/User");

const protect = async (req, res, next) => {
  try {
    const { userId } = req.auth; // from Clerk auth token

    if (!userId)
      return res.status(401).json({ success: false, message: "Not authenticated" });

    const user = await UserModel.findOne({ clerkId: userId });

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Authentication error" });
  }
};

module.exports = { protect };

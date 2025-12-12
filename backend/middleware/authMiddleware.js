// const UserModel = require("../model/user");

// const protect = async (req, res, next) => {
//     try {
//         const { userId } = req.auth;

//         if (!userId) {
//             return res.json({ success: false, message: "not authenticated" });
//         }

//         const user = await UserModel.findById(userId);

//         req.user = user;

//         next();

//     } catch (error) {
//         res.json({ success: false, message: "auth error" });
//     }
// };

// module.exports = { protect };

const UserModel = require("../model/user");

const protect = async (req, res, next) => {
    try {
        const { userId } = req.auth;  // Clerk userId

        if (!userId) {
            return res.json({ success: false, message: "not authenticated" });
        }

        // Find by clerkId instead of _id
        const user = await UserModel.findOne({ clerkId: userId });

        if (!user) {
            return res.json({ success: false, message: "user not found" });
        }

        req.user = user;

        next();

    } catch (error) {
        res.json({ success: false, message: "auth error" });
    }
};

module.exports = { protect };

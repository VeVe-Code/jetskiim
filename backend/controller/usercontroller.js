const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    return res.json({ success: true, role });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



module.exports = { getUserData };



// let usercontroller = {
//   index:(req,res) => {
//    try {
//      let role = req.user.role
//     return res.json({success: true, role})
//    } catch (error) {
//     res.json({success: false, message : error.message})
//    }
//   },
 
// }

// module.exports = usercontroller

// const index = (req, res) => {
//     res.json({
//         success: true,
//         user: req.user
//     });
// };

// module.exports = { index };



// const getUserData = (req, res) => {
//   try {
//     const clerkUserId = req.auth.userId;
//     const role = req.auth.sessionClaims?.role || "user"; // from Clerk JWT template

//     return res.json({
//       success: true,
//       userId: clerkUserId,
//       role,
//     });

//   } catch (error) {
//     return res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


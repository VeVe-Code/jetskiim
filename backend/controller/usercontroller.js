// export const getUserData = async(req,res) =>{
//  try{
//     let role = req.user.role;
//     res.json({success: true,role})
//  }catch(error){
//     res.json({success:false, message: error.message})
//  }
// }

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

const index = (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
};

module.exports = { index };
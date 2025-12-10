const { body, validationResult } = require('express-validator');
let handleerror = (req,res,next)=>{
 const result = validationResult(req);
 if(!result.isEmpty()){
 return res.status(400).json({errors : result.mapped()})
 }else{
   next() 
 }                             //protect 
}

module.exports = handleerror
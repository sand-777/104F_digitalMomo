const jwt = require("jsonwebtoken")
const {promisify} = require("util");
const User = require("../model/userModel");



const isAuthenticated = async(req,res,next)=>{
const token = req.headers.authorization;
if(!token){
    
  return  res.status(403).json({
        message: "Please login"
    })
   
}
//pathayo vane k garney tw
//verify if the token is legit or not

// jwt.verify(token,process.env.KEY,(err,success)=>{
//     if(err){y
//         res.status(400).json({
//             message : "Invalid Token"
//         })
//     }
//     else{
        
//         res.status(200).json({
//             message: "Valid token"
//         })
//     }

// })

//Alternative

try {
  

    const decoded = await promisify(jwt.verify)(token, process.env.KEY);

    console.log(decoded.id)
    const doesUserExist = await User.findOne({_id : decoded.id})
   
    

if(!doesUserExist){
    return res.status(404).json({
        message:"User doesn't exists with that token/id"
    })
}

req.user = doesUserExist

next()


}
 catch (error) {
    res.status(400).json({
        message: error.message
    })
    
}


//check if decoded.id(userId) exist in the user table





}

module.exports = isAuthenticated
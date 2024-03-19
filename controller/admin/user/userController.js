const User = require("../../../model/userModel")

exports.getUsers = async(req,res)=>{

const userId = req.user.id
    const users = await User.find({_id: {$ne : userId}}).select(["+otp","+isOtpVerified","-__v"])
   if(users.length > 1){
    res.status(200).json({
        message : "Users fetched successfully",
        data : users
    })
   } else{
    res.status(404).json({
        message : "User Collection is empty"
        , data : []
    })
   }
}

//delete User API

exports.deleteUser = async(req,res)=>{

    const userId = req.params.id
    if(!userId){
        return res.json({
            message : "Please provide userId"
        })
    }

    //check if that userid exists or not

    const user = await User.findById(userId)
    
    if(!user){
        res.status(404).json({
            message : "User not found with that userid"
        })
    } else{
        await User.findByIdAndDelete(userId)
        res.status(200).json({
         message : "User deleted successfully"
        })
    }
}
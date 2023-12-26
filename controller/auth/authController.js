const User = require("../../model/userModel")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../Services/email");



exports.registerUser = async (req,res)=>{
    const {email,userName,password,phoneNo} = req.body
    if(!email||!userName||!password||!phoneNo){
        return res.status(400).json({
            message : "error"
        })

    }

    //to check if email already exists

    userFound = await User.find({userEmail : email})


    

    if(userFound.length>0){
      return  res.status(400).json({
        message:"User with email already registed"
        })
    }

    //create user

   await User.create({
        userEmail : email,
        userPhoneNumber : phoneNo,
        userName : userName,
        userPassword : bcrypt.hashSync(password,10)
    })

    res.status(201).json({
        message: "user registered"
    })
    console.log(req.body)
}



exports.loginUser = async (req,res)=>{
    const{password,email} = req.body

    if(!email||!password){
        res.status(404).json({
            message: "Enter username and password"
        })
    }

    userFound = await User.find({userEmail : email})


    

    //check if email is registered

    if(userFound.length == 0){
       return res.status(404).json({
            message:"The email provided isn't registered",
            
        })
    } 

    //check password

   const isMatched = bcrypt.compareSync(password,userFound[0].userPassword)



   if(isMatched){

    //generate token
   const token = jwt.sign({id : userFound[0]._id},process.env.KEY,{expiresIn : '30d'})
    res.status(200).json({
        message : "logged in successfully",
        token
    })
   }

   else{
    res.status(404).json({
        message : "Invalid password"
    })
   }


    

}

//api to send otp

exports.forgetPassword = async(req,res)=>{
    const {email} = req.body
  try {

    if(!email){
        return res.status(404).json({
            message:"Enter your email"
        })
    }

    const isMatched = await User.find({userEmail : email})
    if(isMatched.length==0){
       return res.status(404).json({
            message : "Enter a valid email"
        })
    }

   


       const otp = Math.floor(1000 + Math.random() * 9000);
       isMatched[0].otp = otp;
       await  isMatched[0].save();
     await  sendEmail({
            email : email,
            subject : "your otp is",
            message : `Your otp is ${otp}`
        })

        res.status(200).json({
            message : "otp sent successfully"
        })

    

    
  } catch (error) {
    console.log(error);
    
  } 

}

//api to verify otp

exports.verifyOtp = async(req,res)=>{
    const {email,otp} = req.body;
    if(!email||!otp){
        return res.status(404).json({
            message:"Please provide email and otp"
        })
    }

    const UserFound = await User.find({userEmail : email})

    if(UserFound.length==0){
       return res.status(404).json({
            message : "Email don't match"
        })
    }

    if(UserFound[0].otp !== otp) {
         res.status(404).json({
            message:"Otp don't match"
        })
    }
    else{
        //dispose the otp so cannot be used next time with same otp
        UserFound[0].otp = undefined
        await UserFound[0].save()
        res.status(200).json({
            message : "otp matched"
        })


    }

}

exports.resetPassword = async(req,res)=>{
    const{email,newPassword,confirmPassword} = req.body
    if(!email||!newPassword||!confirmPassword){
        return res.status(400).json({
            message:"Please provide new password"
        })
    }

    if(newPassword!=confirmPassword){
        return res.status(400).json({
            message:"The new password and confirmed password don't match"
        })
    }

    const userFound = await User.find({userEmail : email})
    if(userFound.length==0){
        return res.status(404).json({
             message : "Email not registered"
         })
     }

     userFound[0].userPassword = bcrypt.hashSync(newPassword,10)
     await userFound[0].save();

     res.status(200).json({
        message:"password changed successfully"
     })




}
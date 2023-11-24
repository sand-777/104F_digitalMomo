const User = require("../../model/userModel")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")



exports.registerUser = async (req,res)=>{
    const {email,userName,password,phoneNo} = req.body
    if(!email||!userName||!password||!phoneNo){
        return res.status(400).json({
            message : "error"
        })

    }

    //to check if email already exists

    userFound = await User.find({userEmail : email})

    console.log(userFound)

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
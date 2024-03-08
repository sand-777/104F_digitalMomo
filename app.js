const express = require("express")
const { connectDatabase } = require("./database/database");
const User = require("./model/userModel");
const app = express()

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerUser, loginUser } = require("./controller/auth/authController");

const authRoute = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")


app.use(express.json());
app.use(express.urlencoded({extended:true}))


//telling nodejs to give access to uploads folder
app.use(express.static("./uploads"))




//tell node to use dotenv
require("dotenv").config()

//Database Connection
connectDatabase()


// test api to check if server is live or not

app.get("/",(req,res)=>{
    res.status(200).json({
    
        message: "I am alive"
    })
})

app.use("/api",authRoute)
app.use("/api",productRoute)




const PORT = process.env.PORT

//listen server
app.listen(PORT,()=>{
    console.log("Server has started at PORT " + PORT)
})





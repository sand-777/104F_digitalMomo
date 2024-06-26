const express = require("express")
const { connectDatabase } = require("./database/database");
const User = require("./model/userModel");
const app = express()
const cors = require("cors")

const {Server} = require("socket.io")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const { registerUser, loginUser } = require("./controller/auth/authController");
const authRoute = require("./routes/auth/authRoute")
const productRoute = require("./routes/admin/productRoute")
const adminUserRoute = require("./routes/admin/adminUsersRoute")
const userReviewRoute = require("./routes/user/userReviewRoute")
const profileRoute = require("./routes/user/profileRoute")
const cartRoute = require("./routes/user/cartRoute")
const orderRoute = require("./routes/user/orderRoute")
const adminOrderRoute = require("./routes/admin/adminOrderRoute")
const paymentRoute = require("./routes/user/paymentRoute")


app.use(express.json());
app.use(express.urlencoded({extended:true}))


//telling nodejs to give access to uploads folder
app.use(express.static("./uploads"))

app.use(cors({
    origin : '*'
}))


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

app.use("/api/auth",authRoute)
app.use("/api/products",productRoute)
app.use("/api/admin",adminUserRoute)
app.use("/api/reviews",userReviewRoute)
app.use("/api/profile",profileRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)
app.use("/api/admin/order",adminOrderRoute)
app.use("/api/payment",paymentRoute)





const PORT = process.env.PORT

//listen server

const server = app.listen(PORT,()=>{
    console.log("Server has started at PORT " + PORT)
})

const io = new Server(server)



// io.on("connection",(socket)=>{
//  socket.on("register",async (data)=>{
// //     const{email,phoneNumber,userName,password} = data
// //    await User.create({
// //     userEmail : email,
// //     userPhoneNumber : phoneNumber,
// //     userName : userName,
// //     userPassword : password
// //    })
// //    socket.emit('response',{message : "User Registered"})
//    io.to(socket.id).emit('response',{
//     message : "User registered"
//    })
//  })
// })

function getSocketIo(){
    return io
}

module.exports.getSocketIo = getSocketIo



const mongoose = require("mongoose");
exports.connectDatabase = async ()=>{
    // connecting to database
    //jaba samma database sanga connect hudaina wait gar
await mongoose.connect(process.env.MONGO_URI)
console.log("Database connected successfully")


}
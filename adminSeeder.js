const User = require("./model/userModel")
const bcrypt = require("bcryptjs")

const adminSeeder = async()=>{

//check whether admin exists or not
isAdminExists = await User.findOne({userEmail:"admin@gmail.com"})
console.log(isAdminExists)

if(!isAdminExists){

    //admin seeding

await User.create({
    userEmail : "admin@gmail.com",
    userPassword: bcrypt.hashSync("admin",10),
    userName : "admin",
    userPhoneNumber: "9824150395",
    role : "admin"
})



console.log("admin seeded successfully")
}

else{
    console.log("admin already seeded")
}


}

module.exports = adminSeeder
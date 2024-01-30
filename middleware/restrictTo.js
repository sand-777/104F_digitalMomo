const restrictTo = (...roles)=>{
return(req,res,next)=>{
   const userRole = req.user.role
    if(!roles.includes(userRole)){
        res.status(403).json({
            message: "you don't have permission"
        })
        
    } 
    else{
        next();
    }
}
}

module.exports = restrictTo
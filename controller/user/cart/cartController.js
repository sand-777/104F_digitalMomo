const Product = require("../../../model/productModel")
const User = require("../../../model/userModel")


exports.addToCart = async(req,res)=>{
    //userId, productId

    const userId = req.user.id
    const {productId} = req.params

    if(!productId){
        return res.status(400).json({
            message : "Please provide ProductId"
        })
    }

    const productExist = await Product.findById(productId)
    if(!productExist){
        return res.status(404).json({
            message : "No product with that productId"
        })
    }

    const user = await User.findById(userId)
    user.cart.push(productId)
    await user.save()
    res.status(200).json({
        message : "Product added to cart"
    })
}

exports.getMyCartItems = async(req,res)=>{
    const userId = req.user.id
    const userData = await User.findById(userId).populate({
        path : "cart",
        select : "-productStatus"
    })
    res.status(200).json({
        message : "Cart Item fetched succcessfully",
        data : userData.cart
    })
}

exports.deleteCartItem = async(req,res)=>{
const userId = req.user.id
const {productId} = req.params
//check if that product exists or not

const product = await Product.findById(productId)
if(!product){
    return res.status(404).json({
        message : "No product with that productId"
    })
}
// get user cart
const user = await User.findById(userId)
user.cart = user.cart.filter((pId)=>pId != productId)
await user.save();

res.status(200).json({
    message : "Cart item deleted"
})

}
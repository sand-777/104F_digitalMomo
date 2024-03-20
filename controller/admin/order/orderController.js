const Order = require("../../../model/orderSchema")

exports.getAllOrders = async(req,res)=>{
    const userId = req.user.id
    const orders = await Order.find().populate({
        path : "items.product",
        model : "Product"
    })
    res.status(200).json({
        message : "Orders fetched successfully",
        orders
    })
}
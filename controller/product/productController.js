const Product = require("../../model/productModel");


exports.createProduct = async(req,res)=>{

    const{productName,productDescription,productStockQty,productPrice,productStatus} = req.body;
    if(!productName||!productDescription||!productStockQty||!productPrice||!productStatus){
        return res.status(400).json({
            message:"Please provide productName,productDescription,productStockQty,productPrice,productStatus"
        })
    }

    Product.create({
        productName,
        productDescription,
        productStockQty,
        productPrice,
        productStatus

    })
    
    return res.status(200).json({
        message:"product create successfully"
    })
}
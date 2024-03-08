const Product = require("../../model/productModel");


exports.createProduct = async(req,res)=>{

    const file = req.file
    let filePath 
    if(!file){
        filePath = "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
    else{
        filePath = req.file.filename
    }

    
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
        productStatus,
        productImage : "http://localhost:2000/" + filePath

    })
    
    return res.status(200).json({
        message:"product created successfully"
    })
}
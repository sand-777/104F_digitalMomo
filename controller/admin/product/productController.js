const catchAsync = require("../../../Services/catchAsync");
const Product = require("../../../model/productModel");
const fs = require("fs")


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

   await Product.create({
        productName,
        productDescription,
        productStockQty,
        productPrice,
        productStatus,
        productImage : process.env.BACKEND_URL + filePath

    })
    
    return res.status(200).json({
        message:"product created successfully"
    })
   
}

exports.getProducts = async(req,res)=>{
    const products = await Product.find().populate({
        path : "reviews",
        populate : {
            path : "userId",
            select : "userName userEmail"
        }
    })
    if(products.length == 0){
        res.status(400).json({
            message : "No Product found",
            product : []
        })
    } else{
        res.status(200).json({
            message : "Products Fetched Successfully",
            products 
        })
    }
}

exports.getProduct = async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            message : "Please provide id(productId)"
        })
    }
    const product = await Product.find({_id : id})
    if(product.length==0){
        res.status(400).json({
            message : "No product found with that id",
            product : []
        })
    }
    else{
        res.status(200).json({
            message: "Product fetched successfully",
            product
        })
    }

}

exports.deleteProduct = async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({
            message : "Please provide id(productId)"
        })
    }
    await Product.findByIdAndDelete(id)
    res.status(200).json({
        message:  "Product deleted successfully"
    })
}

exports.editProduct = async(req,res)=>{


    const {id} = req.params
    const{productName,productDescription,productStockQty,productPrice,productStatus} = req.body;

    if(!productName||!productDescription||!productStockQty||!productPrice||!productStatus){
        return res.status(400).json({
            message:"Please provide productName,productDescription,productStockQty,productPrice,productStatus,id"
        })
    }

    const oldData = await Product.findById(id)
    
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }

    const oldProductImage = oldData.productImage //http://localhost:2000/1709961954047 - AnnapurnaCircuitTrek.jpg

    const lengthToCut = process.env.BACKEND_URL.length
    const finalFilePathAfterCut = oldProductImage.slice(lengthToCut)


    if(req.file && req.file.filename){
      //REMOVE FILE FROM UPLOADS FOLDER

      fs.unlink(finalFilePathAfterCut,(err)=>{
        if(err){
            console.log("error deleting file",err)
        } else{
            console.log("file deleted successfully")
        }
      })
    }

    try {
        const datas = await Product.findByIdAndUpdate(id, {
            productName,
            productDescription,
            productStockQty,
            productPrice,
            productStatus,
            productImage: req.file && req.file.filename ? process.env.BACKEND_URL + req.file.filename : oldProductImage
        }, {
            new: true,
            runValidators: true
        });
    
        res.status(200).json({
            message: "Product updated successfully",
            datas: datas // Send the updated product data to the client
        });
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({ error: error.message });
    }
    
}
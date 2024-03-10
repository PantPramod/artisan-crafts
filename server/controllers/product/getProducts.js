import expressAsyncHandler from "express-async-handler"
import Product from "../../models/product.js"

const getProducts=expressAsyncHandler(async(req, res)=>{
    
    
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20

    const skip =  (page-1) * limit

    const products = await Product.find().skip(skip).limit(limit)
    res.send(products)  

})

export default getProducts
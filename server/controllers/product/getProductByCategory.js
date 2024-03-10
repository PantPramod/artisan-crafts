import expressAsyncHandler from 'express-async-handler'
import Product from '../../models/product.js'

const getProductByCategory = expressAsyncHandler(async (req, res) => {
    const { category } = req.params
    
    const products = await Product.find({ category })
    res.send(products)
})

export default getProductByCategory
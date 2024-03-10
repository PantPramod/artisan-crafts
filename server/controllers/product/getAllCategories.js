import expressAsyncHandler from 'express-async-handler'
import Product from '../../models/product.js'

const getAllCategories = expressAsyncHandler(async (req, res) => {
    const categories = await Product.distinct('category')
    res.send(categories)
})

export default getAllCategories
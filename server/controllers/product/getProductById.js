import expressAsyncHandler from 'express-async-handler'
import Product from '../../models/product.js'

const getProductById = expressAsyncHandler(async (req, res) => {
    const id = req.params.id

    const product = await Product.findById(id)

    res.send(product)
})

export default getProductById

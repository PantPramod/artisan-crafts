import expressAsyncHandler from "express-async-handler"
import Cart from "../../models/cart.js"
import Product from "../../models/product.js"

const addItemToCart = expressAsyncHandler(async (req, res) => {

    const { productId, quantity } = req.body

    const productdetails =await Product.findById(productId)
    
    console.log(productdetails)

    const isProductAdded = await Cart.find({ productId, userId: req.user.userId })
    if (isProductAdded.length >= 1) {
        res.status(400);
        throw new Error("Item already added to cart")
    }
  
    const newItem = await Cart.create({ productId, quantity, userId: req.user.userId, price: quantity * productdetails.price })
    res.send(newItem)
})

export default addItemToCart
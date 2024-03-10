import expressAsyncHandler from "express-async-handler"
import Cart from "../../models/cart.js"

const removeItemFromCart = expressAsyncHandler(async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).send("Cart Item Deleted")
})

export default removeItemFromCart
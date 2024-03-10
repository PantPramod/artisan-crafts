import expressAsyncHandler from "express-async-handler"
import Cart from "../../models/cart.js"

const updateCart = expressAsyncHandler(async (req, res) => {
    const { id, quantity, price } = req.body
    const resp = await Cart.findByIdAndUpdate(id, { quantity, price }, {
        returnOriginal: false
    })
    res.send(resp)
})

export default updateCart
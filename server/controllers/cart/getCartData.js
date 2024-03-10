import asyncHandler from 'express-async-handler'
import Cart from '../../models/cart.js'




const getCartData = asyncHandler(async (req, res) => {

    const cartResult = await Cart.find({ userId: req.user.userId })
    .populate([{ path: 'productId', select: 'title imgUrl price' }, { path: 'userId', select: 'email name ' }])
    res.send(cartResult)
})

export default getCartData






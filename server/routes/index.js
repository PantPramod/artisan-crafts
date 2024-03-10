import express from 'express'
import signup from '../controllers/user/signup.js'
import validator from '../middlewares/validator.js'
import { loginSchema, signUpSchema } from '../helper/inputSchema.js'
import validateToken from '../middlewares/validateToken.js'
import verifyEmail from '../controllers/user/verifyEmail.js'
import loginHandler from '../controllers/user/loginHandler.js'
import refresh from '../controllers/user/refresh.js'
import forgotPasswordHandler from '../controllers/user/forgotPasswordHandler.js'
import resetPasswordHandler from '../controllers/user/resetPasswordHandler.js'
import getProducts from '../controllers/product/getProducts.js'
import Product from '../models/product.js'
import sampleData from '../data/sampleData.js'
import getCartData from '../controllers/cart/getCartData.js'
import addItemToCart from '../controllers/cart/addItemToCart.js'
import removeItemFromCart from '../controllers/cart/removeItemFromCart.js'
import updateCart from '../controllers/cart/updateCart.js'
import getProductById from '../controllers/product/getProductById.js'
import getProductByCategory from '../controllers/product/getProductByCategory.js'
import getAllCategories from '../controllers/product/getAllCategories.js'

const router = express.Router()

//    user routes starts from here 

router.post("/user/login", validator(loginSchema), loginHandler)

router.post("/user/signup", validator(signUpSchema), signup)

router.post("/user/verify", verifyEmail)

router.post("/user/forgotpassword", forgotPasswordHandler)

router.post("/user/resetpassword", validateToken, resetPasswordHandler)

router.get("/user/refresh", refresh)


// product routes starts from here  

router.get("/product/getProducts", getProducts)

router.get("/product/insertmany", async (req, res) => {
    const response = await Product.insertMany(sampleData)
    res.json(response)
})


router.get("/categories", getAllCategories)

router.get("/product/:id", getProductById)

router.get("/product/category/:category", getProductByCategory)








// cart routes starts from here

router.get("/cart", validateToken, getCartData)

router.post("/cart", validateToken, addItemToCart)

router.delete("/cart/:id", validateToken, removeItemFromCart)

router.patch("/cart/:id", validateToken, updateCart)


export default router
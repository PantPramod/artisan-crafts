import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import User from '../../models/user.js'
import jwt from 'jsonwebtoken'
import sendMail from '../../helper/sendMail.js'
import { signupEmailTemplate } from '../../helper/EmailTemplate.js'

const loginHandler = expressAsyncHandler(async (req, res) => {

    const { email, password } = req.body;


    const response = await User.findOne({ email });

    if (!response) {
        res.status(400)
        throw new Error("Email Not Exist!")
    }
    if (!response?.isEmailVerified) {
        const sender = process.env.EMAIL
        const password = process.env.PASSWORD
        const receiver = response.email
        const token = jwt.sign({ userId: response._id, email: response.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '120m' })

        sendMail(sender, password, receiver, token, signupEmailTemplate, "Email Verification link")
        res.status(400)
        throw new Error("Email is not verified .check your email to Verify.")
    }
    const passwordMatch = await bcrypt.compare(password, response.password);

    if (!passwordMatch) {
        res.status(400)
        throw new Error("Wrong Credentials")
    }


    const token = jwt.sign({ userId: response._id, email: response.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '120m' });

    const refreshToken = jwt.sign({ userId: response._id, email: response.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3d' });


    res.status(200).json({
        message: 'Login successful',
        token,
        refreshToken,
        email: response.email,
        _id: response._id
    });
})


export default loginHandler
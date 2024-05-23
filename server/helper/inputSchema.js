import Joi from 'joi';

const signUpSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .pattern(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$`)).required(),

    profilePicture: Joi.string().optional(),

    isEmailVerified: Joi.boolean().optional(),

    name: Joi.string().optional(),

})



const loginSchema = Joi.object({
    email: Joi
        .string()
        .email()
        .required(),

    password: Joi.string().required(),
})

export { signUpSchema, loginSchema }
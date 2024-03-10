'use client'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

type Inputs = {
    email: string
    password: string
    confirmPassword: string,
    name: string,
    confirmation: boolean
}

const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<Inputs>()


    const [show, setShow] = useState({
        password: false,
        confirmPassword: false
    })

    const onSubmit: SubmitHandler<Inputs> = async (info) => {
        const { email, password, name } = info


        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/signup`, {
                email, password, name
            })

            toast.success(data?.message)

        } catch (err: any) {
            toast.error(err?.response?.data?.message)

        } finally {
            reset()
        }
    }

    function isValidEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px] mx-auto px-4 min-h-screen">

                <h2 className="text-center text-2xl uppercase pt-10">Signup Form</h2>



                <input {...register("email", {
                    required: { message: "Email is Required", value: true },
                    validate: (val) => isValidEmail(val) || 'Invalid Email'
                })}
                    type="text"
                    placeholder="Enter Your Email *"
                    className="border border-gray-400 rounded-md outline-none p-3 mt-5 w-full"
                />
                <p className="text-sm text-red-500 h-[25px]">{errors?.email?.message} </p>

                <div className="flex items-center border border-gray-400 rounded-md   mt-2 w-full">
                    <input {...register("password", {
                        required: { message: "Password is Required", value: true },
                        minLength: { message: "Password should be mininimum 2 Characters long", value: 2 },
                        maxLength: { message: "Password should be maximun 15 Characters long", value: 15 }
                    })}
                        type={show.password ? "text" : "password"}
                        placeholder="Select Your Password *"
                        className="w-full flex-1 p-3 rounded-md outline-none"
                    />
                    <span className="p-3 cursor-pointer" onClick={() => setShow((prev) => ({ ...prev, password: !prev.password }))}>
                        {show.password ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <p className="text-sm text-red-500 h-[25px]">{errors?.password?.message} </p>
                <div className="flex items-center border border-gray-400 rounded-md   mt-2 w-full">
                    <input {...register("confirmPassword", {
                        required: { message: "Confirm Password is Required", value: true },
                        validate: (val) => watch("password") === val || "Confirm Password should be as Password"

                    })}
                        type={show.confirmPassword ? "text" : "password"}
                        placeholder="Confirm Password *"
                        className="w-full flex-1 p-3 rounded-md outline-none"

                    />
                    <span className="p-3 cursor-pointer"
                        onClick={() => setShow((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}>
                        {show.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <p className="text-sm text-red-500 h-[25px]">{errors?.confirmPassword?.message} </p>

                <input {...register("name", {
                    minLength: { value: 2, message: "Name should be minimum 2 Characters long" },
                    maxLength: { message: "Name should be maximum 30 characters long", value: 30 },

                })}
                    placeholder="Enter Your Name"
                    className="border border-gray-400 rounded-md outline-none p-3 mt-2 w-full"
                />
                <p className="text-sm text-red-500 h-[25px]">{errors?.name?.message} </p>

                <div className={`border p-2 rounded-md ${errors.confirmation?.message && "border-red-600"}`}>
                    <input {...register("confirmation", {
                        required: { value: true, message: "For signingup check this box" }
                    })}
                        type="checkbox"
                        className="mr-2 cursor-pointer "
                    />
                    <a href="#" className="text-sm">By Checking on this you will be Agree for Terms & Conditions.</a>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-600 w-full rounded-md text-white p-3 hover:bg-blue-800 transition-all ease-in-out duration-300"
                >
                    Sign Up
                </button>
                <p className="text-center"> <Link href="/login"
                    className="mt-2 text-sm text-blue-900"
                >Already have an account . Click here to login</Link></p>

            </form>
        </>
    )
}

export default Signup
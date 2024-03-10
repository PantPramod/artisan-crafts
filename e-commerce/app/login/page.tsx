'use client'
import axios from "axios"
import Link from "next/link"
import { FormEvent, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import useAuth from "@/components/AuthContext/useAuth"

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {saveToken} = useAuth()


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, { email, password })
            saveToken(data?.token)
            Cookies.set('refreshToken', data?.refreshToken)
            toast.success(data?.message)
            router.push("/")
        } catch (err: any) {
            toast.error(err?.response?.data?.message)
        } finally {
            setEmail('')
            setPassword('')
        }

    }
    return (
        <>
         
            <form className="max-w-[500px] mx-auto px-4 min-h-screen" onSubmit={handleSubmit}>

                <h2 className="text-center text-2xl uppercase pt-10">Login Form</h2>

                <input
                    type="email"
                    placeholder="Email Address"
                    className="border border-gray-400 rounded-md outline-none p-3 mt-5 w-full"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border border-gray-400 rounded-md outline-none p-3 mt-5 w-full"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Link href="/forgotpassword" className="text-sm mt-2 text-gray-600 hover:text-black">Forgot Password click here.</Link>

                <button
                    type="submit"
                    className="mt-10 bg-blue-600 w-full rounded-md text-white p-3"
                >
                    Log In
                </button>
                <p className="text-center"> <Link href="/register"
                    className="mt-2 text-sm text-blue-900"
                >Don't have an account . Click here to Register</Link></p>
            </form>
        </>)
}

export default Login
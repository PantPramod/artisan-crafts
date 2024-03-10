'use client'
import axios from 'axios'
import { FormEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {  useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/resetpassword`, {
                password
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            toast.success(data?.message)
            router.push("/login")
        } catch (err: any) {
            toast.error(err?.reponse?.data?.message??"Error")
        }
    }
    return (
        <form onSubmit={submitHandler} className="max-w-[500px] mx-auto px-4 min-h-screen">
        

            <h2 className="text-center text-2xl uppercase pt-10">Reset Password</h2>

            <input
                type="password"
                placeholder="Enter New Password"
                className="border border-gray-400 rounded-md outline-none p-3 mt-10 w-full"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="mt-10 border-blue-600 border-2 font-bold w-full rounded-md text-blue-600 p-3 hover:bg-blue-800 hover:text-white transition-all ease-in-out duration-300"
            >
                Change Password
            </button>
        </form>
    )
}

export default ResetPassword

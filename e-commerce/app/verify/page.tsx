'use client'
import axios from "axios"
import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useSearchParams } from "next/navigation"
import Cookies from "js-cookie"
import useAuth from "@/components/AuthContext/useAuth"

const EmailVerification = () => {

    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const { saveToken } = useAuth()


    useEffect(() => {
        (async () => {
            if (token) {
                try {
                    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/verify`, {
                        token: token,
                    });
                    saveToken(data?.token)
                    Cookies.set('refreshToken', data?.refreshToken)
                    toast.success(data?.message)

                } catch (err) {
                    toast.error("Wrong Token")

                }
            } else {
                toast.error("No Token Found")

            }
        })()
    }, [])
    return (
        <>

            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        </>
    )
}

export default EmailVerification
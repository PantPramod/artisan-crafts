'use client'
import useAuth from '@/components/AuthContext/useAuth'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useFetch = (arg: string) => {
    const { token } = useAuth()
    const [result, setResult] = useState<any>([])
    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(arg, { headers: { Authorization: `Bearer ${token}` } })
                setResult([...data])
            } catch (err: any) {
                setErrorMessage(err?.response?.data?.message)
            }
        })()
    }, [])
    return { result, errorMessage }
}

export default useFetch

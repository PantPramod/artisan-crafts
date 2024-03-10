'use client'
import React, {  useState, createContext, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'


export const AuthContext = createContext({
    token: '',
    saveToken: (arg0: string) => { },
    removeToken: () => { }
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState("")

    useEffect(()=>{
      if(typeof window !== 'undefined'){
         setToken(Cookies.get('token')??'')       
        }
    },[])

    
    const saveToken = (str: string) => {
        setToken(str)
        Cookies.set('token', str)
    }

    const removeToken = () => {
        setToken("")
        Cookies.remove("token")
    }
    const value = {
        token,
        saveToken,
        removeToken
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

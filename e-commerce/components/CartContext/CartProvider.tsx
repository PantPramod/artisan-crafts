'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { createContext } from 'react'
import { cartType } from '../layout/Navigation'
import toast from 'react-hot-toast'
import useAuth from '../AuthContext/useAuth'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type cartContextType = {
    cartData: cartType[],
    saveCartData: (arg0: cartType[]) => void;
    removeItemFromCartHandler: (arg: string, arg1: number) => void,
    updateQuantity: (id: string, quantity: number, price: number, index: number) => void
    getCartData:()=>void
    addToCartHandler:(productId: string, quantity: number)=>void
    loading: boolean,
    subtotal: number

}
export const CartContext = createContext<cartContextType>({
    cartData: [],
    saveCartData: () => { },
    removeItemFromCartHandler: () => { },
    updateQuantity: () => { },
    getCartData:()=>{},
    addToCartHandler:()=>{},
    loading: false,
    subtotal: 0
})
const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartData, setCartData] = useState<cartType[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const { token } = useAuth()
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    const getCartData = async () => {
        if (token) {
            try {
                setLoading(true)
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`, { headers: { Authorization: `Bearer ${token}` } })
                setCartData([...data])
                setSubtotal(data.reduce(function (acc: any, obj: any) { return acc + obj?.price; }, 0))
                console.log(data)
            } catch (err: any) {

            } finally {
                setLoading(false)
            }
        }

    }
    useEffect(() => {
        getCartData()
    }, [token])

    const removeItemFromCartHandler = async (id: string, index: number) => {
        try {
            const { data }: any = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success(data)
            cartData.splice(index, 1)
            setCartData([...cartData])
            setSubtotal(cartData.reduce(function (acc: any, obj: any) { return acc + obj?.price; }, 0))
            console.log(data)
        } catch (err: any) {
            console.log(err)
            toast.error(err?.response?.message ? err?.response?.message : "Something went wrong")
        }
    }


    const updateQuantity = async (id: string, quantity: number, price: number, index: number) => {
        try {
            const { data }: any = await axios.request({
                method: 'PATCH',
                url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { id, quantity, price }
            })

            cartData[index].price = price;
            cartData[index].quantity = quantity;
            setCartData([...cartData])
            setSubtotal(cartData.reduce(function (acc: any, obj: any) { return acc + obj?.price; }, 0))
            toast.success("Updated cart Items")
            console.log(data);
        } catch (err: any) {
            console.log(err)
            toast.error(err?.response?.data.message ? err?.response?.data.message : "Something went wrong")
        }


    }

    const addToCartHandler = async (productId: string, quantity: number) => {
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`, { productId, quantity }, { headers: { Authorization: `Bearer ${token}` } })
            getCartData()
            toast.success("Item added to cart")
            console.log(data)
        } catch (err: any) {
            if (err.response.status === 400 || err.response.status === 500) {
                toast.error(err?.response?.data?.message)
            } else {
                toast.error(err?.response?.data?.message)
                router.push("/login")
            }


        }
    }

    const saveCartData = (arr: cartType[]) => {
        setCartData([...arr])
    }
    const value = {
        cartData,
        saveCartData,
        addToCartHandler,
        removeItemFromCartHandler,
        updateQuantity,
        getCartData,
        loading,
        subtotal,
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

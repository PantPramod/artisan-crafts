"use client"
import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import Button from './Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuth from '../AuthContext/useAuth';
import useCart from '../CartContext/useCart';
export type propType = {
    info: {
        _id: string
        imgUrl: string
        title: string
        price: number
        topPrice: number,
        category: string
    }
}
const ProductCard = ({ info: { _id, imgUrl, price, topPrice, title, category } }: propType) => {
    const router = useRouter()
    const { token } = useAuth()
    const { getCartData,addToCartHandler } = useCart()



   
    return (
        <div
            onClick={() => router.push(`/products/${_id}`)}
            className='w-full  group cursor-pointer  p-2 md:p-4 '
            
            >
            <div className='relative'>
                <span className='z-[999] bg-white  rounded-full w-[30px] h-[30px]  flex items-center justify-center shadow-md absolute top-2 right-2 cursor-pointer hover:bg-gray-300'>
                    <FaHeart className="text-[#8f8c8c]" />
                </span>

                <img src={imgUrl}
                    alt={imgUrl}
                    className="w-full group-hover:scale-110 transition-all ease-in-out duration-300  h-[250px] object-contain"

                // width={200}
                // height={250}
                />
            </div>
            <p className='mt-1 text-xl text-center font-semibold min-h-[50px]'>{title}</p>
            <p className='text-center text-red-700 font-bold text-xl mb-2'>
                ₹ {price}
                <del className='text-sm ml-2'>₹ {topPrice}</del>
            </p>

            <Button
                value="Add To Cart"
                className='w-full bg-black text-white'
                onClick={(e: Event) => { e.stopPropagation(); addToCartHandler(_id, 1) }}
            />

        </div>
    )
}

export default ProductCard

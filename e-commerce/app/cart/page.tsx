'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useAuth from '@/components/AuthContext/useAuth'
import toast from 'react-hot-toast'
import useCart from '@/components/CartContext/useCart'

const Cart = () => {
const {cartData,loading,removeItemFromCartHandler,subtotal,updateQuantity} = useCart()
    return (
        <>{loading ?
            <div className='min-h-screen'></div> :
            <>
                <div className='min-h-screen w-[90%] mx-auto pb-20'>
                    <h2 className='text-3xl  font-bold py-10'>My Cart</h2>
                    {
                        cartData.length === 0 ?
                            <>
                                <h2 className='text-center text-2cl p-3'>No Items In the Cart</h2>
                                <img
                                    src="https://ouch-cdn2.icons8.com/nC3HaCGSAW-r9xtJ9b1iDjFqhqxykpUZxThkxKwePnk/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMy82/YTk5NTJiMi1mNWVh/LTRkNDAtYjZlMi1h/ZGQzODUwYTIwMjUu/c3Zn.png"
                                    className='w-8/12 mx-auto'
                                    alt="No Items in the List"

                                />
                            </> :
                            <>
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th>S.no.</th>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cartData.map((item: any, index: number) => (<tr key={item?._id}>
                                                    <td>{index + 1}</td>
                                                    <td className='p-10'>
                                                        <img
                                                            src={item?.productId?.imgUrl}
                                                            width={150}
                                                            height={150}
                                                            alt=""
                                                        />
                                                    </td>
                                                    <td className='p-10'>
                                                        <p>{item?.productId?.title}</p>
                                                        <p
                                                            onClick={() => removeItemFromCartHandler(item?._id, index)}
                                                            className='text-red-700 text-xs cursor-pointer'>remove</p>
                                                    </td>

                                                    <td className='p-10'>
                                                        <div className='flex items-center gap-x-2 '>
                                                            <p>{item?.quantity}</p>
                                                            <div className="self-start ">
                                                                <button
                                                                    onClick={() => item.quantity >= 2 && updateQuantity(item._id, item.quantity - 1, (item.quantity - 1) * item.productId.price, index)}
                                                                    className="border border-black  px-2 py-0  border-r-0 hover:bg-gray-50">-</button>
                                                                <button
                                                                    onClick={() => updateQuantity(item._id, item.quantity + 1, (item.quantity + 1) * item.productId.price, index)}
                                                                    className="border border-black  px-2 py-0 hover:bg-gray-50">+</button>
                                                            </div>

                                                        </div>
                                                    </td>
                                                    <td className='font-bold p-10'>₹{item?.price.toFixed(2)}</td>
                                                </tr>))
                                            }
                                        </tbody>
                                    </table>

                                    <div className='flex flex-col mt-5 items-end'>
                                        <p className='text-2xl font-bold'>Subtotal: ₹{subtotal.toFixed(2)}</p>
                                        <Link href="/checkout">
                                            <button className='mt-5 text-xl font-bold bg-blue-700 text-white px-8 py-2 rounded-sm'>Proceed to Checkout</button>
                                        </Link>
                                    </div>

                                </div>
                            </>
                    }

                </div>
            </>
        }

        </>
    )
}

export default Cart


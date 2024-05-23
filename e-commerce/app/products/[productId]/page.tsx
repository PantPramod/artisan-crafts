'use client'
import useCart from '@/components/CartContext/useCart';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";

export type productType = {
    _id?: string
    title: string,
    category: string,
    description: string,
    price: number,
    topPrice: number,
    imgUrl: string

}
const page = ({ params }: any) => {
    const [productData, setProductData] = useState<productType>({} as productType)
    const { productId, slug: category } = params
    const { addToCartHandler } = useCart()
    useEffect(() => {
        if (productId) {
            (async () => {
                try {
                    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/${productId}`)
                    console.log(data)
                    setProductData({ ...data })
                } catch (err) {
                    console.log(err)
                }
            })()
        }

    }, [productId])

    const rating = 5
    const seller = {
        name: "Himanshi Enterprises",

    }
    return (<>
        <div>
            <p className='text-xs text-gray-700 px-10'>Home / products / {productData?.title}</p>

            <div className='flex '>
                <div className='w-[45%] flex '>
                    <div className='w-[20%]   px-4 pt-10'>
                        <img
                            src={productData?.imgUrl}
                            alt=""
                            className='w-full  max-w-[100px] cursor-pointer'
                        />
                        <img
                            src={productData?.imgUrl}
                            alt=""
                            className='w-full  max-w-[100px] cursor-pointer mt-5'
                        />
                    </div>

                    <img
                        src={productData?.imgUrl}
                        alt=""
                        className='w-full flex-1  max-w-[400px] object-contain'
                    />
                </div>
                <div className='px-10 py-10 w-[45%]'>
                    <p className='text-2xl'>{productData?.title}</p>
                    <p className='text-sm'>From {seller?.name}</p>
                    <div className='flex items-center gap-x-1'>
                        <FaStar color="902735" />
                        <FaStar color="902735" />
                        <FaStar color="902735" />
                        <FaStar color="902735" />
                        <FaStar color="902735" />
                        <span>{`(${rating}/5)`}</span>
                    </div>

                    <p className='text-3xl text-yellow-500'>₹ {productData?.price}</p>
                    <p className='text-sm text-[#902735]'>inclusive of all taxes  </p>

                    <div className='flex w-full text-gray-700 mt-10 border-b border-b-gray-200 pb-2'>
                        <div className='w-1/2'>
                            <p className='font-semibold'>Details : </p>
                            <p className='text-sm'>Return Window</p>
                            <p className=''>7 days</p>

                        </div>
                        <div className='w-1/2'>
                            <p className='font-semibold'>More : </p>
                            <p className='text-sm'>Time to ship</p>
                            <p className=''>7 days</p>
                        </div>
                    </div>

                    <div className='flex w-full text-gray-700 mt-2'>
                        <div className='w-1/2'>
                            <p className='font-semibold'>Returnable : </p>
                            <p className='text-sm'>Yes</p>


                        </div>
                        <div className='w-1/2'>
                            <p className='font-semibold'>Cancellable : </p>
                            <p className='text-sm'>Yes</p>

                        </div>
                    </div>

                    <div className='flex items-center gap-x-4 mt-10'>
                        <button
                            onClick={() => { addToCartHandler(productId, 1) }}
                            className='w-1/2 bg-[#902735] hover:bg-black text-white rounded-md uppercase py-3'>Add To Cart</button>
                        <button className='w-1/2 bg-[green] hover:bg-[forestgreen] text-white rounded-md uppercase py-3 '>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default page

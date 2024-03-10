'use client'
import { productType } from '@/app/[slug]/[productId]/page'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import useCart from '../CartContext/useCart'

type propTypes = {
    product: productType
}
const ProductCard2 = ({ product }: propTypes) => {
    const { addToCartHandler } = useCart()
    const pathname = usePathname()
    const router = useRouter()
    return (
        <div
            onClick={() => router.push(`${pathname}/${product._id}`)}
            className='w-[260px] hover:shadow-2xl p-4 cursor-pointer'>
            <img
                src={product?.imgUrl}
                alt=""
                className=' w-[230px] h-[200px] object-contain cursor-pointer'
                width={290}
                height={290}
            />
            <p className='text-center'>{product?.title}</p>
            <p className='text-center'>
                <span className='text-yellow-600'>₹ {product?.price}</span>
                <del className='text-gray-400 text-xs ml-1'>₹ {product?.topPrice}</del>
                <span className='text-sm ml-1'>{Math.floor(((product?.topPrice - product.price)*100) / product.topPrice)}% off</span>
            </p>
            <button
                onClick={(e) => { e.stopPropagation(); addToCartHandler(product?._id!, 1) }}
                className='bg-[#902735] hover:bg-black w-full text-white rounded-md py-2'>Add To Cart</button>
        </div>
    )
}

export default ProductCard2


const prod={
    title:"Red Leather Dress",
    price:300,
    topPrice:500,
    imgUrl:"some url",
    category:"Home Decor",

}
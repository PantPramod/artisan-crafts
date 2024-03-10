'use client'
import FilterGroup from '@/components/other/FilterGroup'
import ProductCard2 from '@/components/ui/ProductCard2'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { productType } from './[productId]/page'

type propTypes = {
    params: {
        slug: string
    }
}
const Category = ({ params: { slug } }: propTypes) => {
    const length = 1000
    const [products, setProducts] = useState<productType[]>([])

    const category = slug.replaceAll("-", " ")
    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/category/${category}`)
            setProducts([...data])

            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (slug) {
            getProductsByCategory()
        }
    }, [slug])
    return (
        <div className='min-h-[calc(100vh-85px)]'>
            <div className='capitalize text-gray-700 text-sm px-6 '>
                <p className='text-[13px] py-1'>
                    Home / <span className='font-bold'>{slug.replaceAll("-", " ")}</span>
                </p>
                <p className='py-1'>
                    <span className='font-bold'>{slug.replaceAll("-", " ")}</span> {" "}- {" "}
                    {length} items
                </p>
            </div>
            <div className='flex pt-5 '>
                <div className=' min-w-[200px] min-h-full '>
                    <p className='uppercase text-sm font-bold py-2 px-6'>Filters</p>
                    <FilterGroup />
                </div>
                <div className='flex-1 min-h-full px-10 py-5 flex-wrap justify-between w-full flex gap-x-2 items-center gap-y-5'>

                    {
                        products.map((product)=><ProductCard2 product={product} />)
                    }

                </div>
            </div>
        </div>
    )
}

export default Category

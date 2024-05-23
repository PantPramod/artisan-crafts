'use client'
import FilterGroup from '@/components/other/FilterGroup'
import ProductCard2 from '@/components/ui/ProductCard2'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { productType } from './[productId]/page'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'


const Category = () => {
    const length = 1000
    const [products, setProducts] = useState<productType[]>([])
    const [page, setPage] = useState(1)
    const searchParams = useSearchParams()
    const [allCategories, setAllCategories] = useState<string[]>([])

    const [categories, setCategories] = useState<string[]>([])
    const [material, setMaterial] = useState<string[]>([])
    const [discount, setDiscount] = useState(0)

    let pageSize = 10

    const pathname = usePathname()
    const router = useRouter()

   

    useEffect(() => {
        const getProductsByCategory = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/filter`,
                    {
                        params: {
                            ...(categories.length > 0 && { categories }),
                            ...(discount && { discount }),
                            ...(material.length > 0 && { material }),
                            page,
                            pageSize
                        }
                    }
                )
                setProducts([...data])
    
                console.log(data)
            } catch (err) {
                // console.log(err)
            }
        }
      
            getProductsByCategory()
      
    }, [ categories, discount, material, page, pageSize])

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const setMaterialValue = (str: string) => {
        let index = material.indexOf(str)

        if (index === -1) {
            material.push(str)

        } else {
            material.splice(index, 1)
        }
        setMaterial([...material])
        router.push(pathname + '?' + createQueryString('material', material.join(',')))


    }

    const setDiscountValue = (num: number) => {
        let val;
        discount === num ? val = 0 : val = num
        setDiscount(val)
        router.push(pathname + '?' + createQueryString('discount', `${val}`))
    }

    const setCategoryValue = (str: string) => {
        let index = categories.indexOf(str)

        if (index === -1) {
            categories.push(str)

        } else {
            categories.splice(index, 1)
        }
        setCategories([...categories])
        router.push(pathname + '?' + createQueryString('category', categories.join(',')))

    }

    useEffect(() => {
        const initialize = () => {
            let discount = searchParams.get('discount')
            let category = searchParams.get('category')
            let material = searchParams.get('material')
            discount == null ? setDiscount(0) : setDiscount(+discount)
            category == null ? setCategories([]) : setCategories([...category?.split(",")])
            material == null ? setMaterial([]) : setMaterial([...material?.split(",")])
        }

        initialize()
    }, [])

    useEffect(() => {

        const getAllCategories = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/categories`)
                console.log(data)
                setAllCategories([...data])
            } catch (err) {
                console.log(err)
            }
        }
        getAllCategories()
    }, [])

    return (
        <div className='min-h-[calc(100vh-85px)]'>
            <div className='capitalize text-gray-700 text-sm px-6 '>
              
            </div>
            <div className='flex pt-5 '>
                <div className=' min-w-[200px] min-h-full '>
                    <p className='uppercase text-sm font-bold py-2 px-6'>Categories</p>
                    <div className='px-8'>
                        {allCategories.map((item) => <div className='flex w-full  py-1' key={item}>
                            <label>{item}</label>
                            <input
                                className='ml-2 bg-white accent-pink-500 cursor-pointer'
                                type='checkbox'
                                onChange={(e) => setCategoryValue(e.target.value)}
                                value={item}
                                checked={categories.includes(item)}

                            />
                        </div>)}
                    </div>
                    <p className='uppercase text-sm font-bold py-2 px-6'>Material</p>

                    <div className=' px-8'>
                        <div className='flex w-full  py-1'>
                            <label>Wood</label>
                            <input
                                className='ml-2 bg-white accent-pink-500 cursor-pointer'
                                type='checkbox'
                                onChange={(e) => setMaterialValue(e.target.value)}
                                value={"Wood"}
                                checked={material.includes("Wood")}
                            />
                        </div>
                        <div className='flex w-full py-1'>
                            <label>Fabric</label>
                            <input
                                className='ml-2 bg-white accent-pink-500 cursor-pointer'
                                type='checkbox'
                                onChange={(e) => setMaterialValue(e.target.value)}
                                value={"Fabric"}
                                checked={material.includes("Fabric")}
                            />
                        </div>
                        <div className='flex w-full py-1'>
                            <label>Paper</label>
                            <input
                                className='ml-2 bg-white accent-pink-500 cursor-pointer'
                                type='checkbox'
                                onChange={(e) => setMaterialValue(e.target.value)}
                                value={"Paper"}
                                checked={material.includes("Paper")}
                            />
                        </div>

                    </div>

                    <p className='uppercase text-sm font-bold py-2 px-6'>Discount</p>
                    <div className=' px-8'>
                        <div className='flex w-full  py-1'>
                            <label>10%</label>
                            <input
                                className='ml-2 bg-white accent-pink-500 cursor-pointer'
                                type='checkbox'
                                onChange={(e) => setDiscountValue(+e.target.value)}
                                value={10}
                                checked={discount === 10}
                            />
                        </div>
                        <div className='flex w-full py-1'>
                            <label>20%</label>
                            <input
                                className='ml-2 bg-white accent-pink-500 cursor-pointer'
                                type='checkbox'
                                onChange={(e) => setDiscountValue(+e.target.value)}
                                value={20}
                                checked={discount === 20}
                            />
                        </div>
                        <div className='flex w-full py-1'>
                            <label>30%</label>
                            <input
                                className='ml-2 bg-white accent-pink-500 cursor-pointer'
                                type='checkbox'
                                onChange={(e) => setDiscountValue(+e.target.value)}
                                value={30}
                                checked={discount === 30}
                            />
                        </div>

                    </div>




                </div>
                <div className='flex-1 min-h-full px-10 py-5 flex-wrap justify-between w-full flex gap-x-2 items-center gap-y-5'>

                    {
                        products.map((product) => <ProductCard2 product={product} key={product._id}/>)
                    }

                </div>
            </div>

        </div>
    )
}

export default Category

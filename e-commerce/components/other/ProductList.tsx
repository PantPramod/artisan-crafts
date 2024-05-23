'use client'
import { useEffect, useState } from "react";
import ProductCard from "../ui/ProductCard"
import productCardData from "../ui/productCardsData"
import useViewportSize from "@/hooks/useViewportSize";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type productType = {
    _id: string
    title: string,
    price: number,
    imgUrl: string,
    topPrice: number,
    category: string

}
type propTypes = {
    selected: "mostPopular" | "whatsNew" | "bestSeller"
}
const ProductList = ({ selected }: propTypes) => {
    const [scrolX, setScrolX] = useState(0)
    const size = useViewportSize()


    const [products, setProducts] = useState<any>([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/getproducts`,
                    { params: { selected } }
                )
                setProducts([...data])
                console.log(data)
            } catch (err) {

            }
        })()
    }, [selected])


    useEffect(()=>{
     if(size){
        setScrolX(0)
     }
    },[size])

    const leftScroll = () => {
        setScrolX(scrolX > 0 ? prev => prev - 1 : prev => prev)
    }
    const rightScroll = () => {
        const length = productCardData.length
        let limit
        if (size === "xs") {
            limit = length / 1
        }
        else if (size === "sm") {
            limit = length / 2
        } else if (size === "md") {
            limit = length / 3
        } else {
            limit = length / 4
        }
        limit = Math.floor(limit)
        console.log(scrolX, limit)
        setScrolX(scrolX < limit ? prev => prev + 1 : prev => prev)



    }
    console.log(scrolX)
    return (
        <>
            {size &&
                <div className="relative max-w-[90%] overflow-x-hidden w-[100%] mx-auto">
                    <div
                        style={{ transform: `translateX(-${scrolX * 100}%)` }}
                        className={`flex items-center transition-all ease-in-out duration-300 `}
                    >

                        {
                            products.map((productInfo: productType) => <div
                                key={productInfo._id}
                                className="min-w-[100%]   sm:min-w-[50%] md:min-w-[33.333%] lg:min-w-[25%]   ">
                                <ProductCard info={productInfo} key={productInfo._id}/>
                            </div>)
                        }

                        {/* {
                            products.slice(0, 25).map((productInfo: productType) => <ProductCard
                                info={productInfo}
                                key={productInfo._id}
                            />)
                        }  */}
                    </div>
                    <button
                        className="overflow-hidden absolute left-4 top-1/2 transform -translate-y-1/2 self-center shadow-md font-bold  rounded-full  bg-[#131212cc] w-10 h-10 flex items-center justify-center text-white"
                        onClick={leftScroll}
                    >
                        <IoIosArrowBack size={22} />
                    </button>
                    <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2  self-center  shadow-md font-bold rounded-full  bg-[#131212cc] text-white w-10 h-10 flex items-center justify-center"
                        onClick={rightScroll}
                    >
                        <IoIosArrowForward size={22} />

                    </button>
                </div>

            }

        </>
    )
}

export default ProductList



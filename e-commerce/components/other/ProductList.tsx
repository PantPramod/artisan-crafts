'use client'
import { useEffect, useState } from "react";
import ProductCard from "../ui/ProductCard"
import productCardData from "../ui/productCardsData"
import useViewportSize from "@/hooks/useViewportSize";
import axios from "axios";

type productType = {
    _id: string
    title: string,
    price: number,
    imgUrl: string,
    topPrice: number,
    category:string

}
const ProductList = () => {
    const [scrolX, setScrolX] = useState(0)
    const size = useViewportSize()

    const [products, setProducts] = useState<any>([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/product/getproducts`)
                setProducts([...data])
                console.log(data)
            } catch (err) {

            }
        })()
    }, [])

    const leftScroll = () => {
        setScrolX(scrolX > 0 ? prev => prev - 1 : prev => prev)
    }
    const rightScroll = () => {
        const length = productCardData.length
        setScrolX(scrolX < length - (size == "xs" ?
            1 :
            size == "sm" ?
                2 :
                4) ?
            prev => prev + 1 :
            prev => prev)
    }

    return (
        <>
            {size &&
                <div className="relative max-w-screen overflow-x-hidden w-[90%] mx-auto">
                    <div
                        style={{ width: `${size == "xs" ? productCardData.length * 100 : size == "sm" ? productCardData.length * 50 : productCardData.length * 25}%`, transform: `translateX(-${(scrolX / productCardData.length) * 100}%)` }}
                        className={`flex items-center transition-all ease-in-out duration-300 `}
                    >
                        {
                            products.map((productInfo:productType) => <ProductCard
                                info={productInfo}
                                key={productInfo._id}
                            />)
                        }
                    </div>
                    <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 self-center shadow-md font-bold py-2 px-4 rounded-full  bg-gray-400"
                        onClick={leftScroll}
                    >
                        &lt;
                    </button>
                    <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2  self-center  shadow-md font-bold py-2 px-4 rounded-full  bg-gray-400"
                        onClick={rightScroll}
                    >
                        &gt;
                    </button>
                </div>

            }

        </>
    )
}

export default ProductList



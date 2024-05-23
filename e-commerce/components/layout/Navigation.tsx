'use client'
import Image from "next/image"
import Link from "next/link"
import Dropdown from "../ui/DropDown"
import NavigationItems from "./NavigationItems"
import { IoCloseCircleOutline, IoLocationSharp } from "react-icons/io5";
import { FaRegUser, FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import useAuth from "../AuthContext/useAuth";
import { useState } from "react"
import useCart from "../CartContext/useCart"
import { usePathname } from "next/navigation"
import { RiMenu2Fill } from "react-icons/ri";
import { GrLogout } from "react-icons/gr";
import { RiLoginBoxLine } from "react-icons/ri";
import { HiMiniUserPlus } from "react-icons/hi2";

const Navigation = () => {
    const { token } = useAuth()
    const [showCart, setShowCart] = useState(false)
    const pathanme = usePathname()
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    console.log(pathanme)
    const { cartData, updateQuantity, removeItemFromCartHandler, subtotal } = useCart()

    const NumberOfItemsInCart = cartData.length
    return (
        <>
            <header className="flex items-center justify-between px-10 py-2 z-[999] sticky top-0 left-0 right-0 bg-white ">
                <Link href="/">
                    <Image src="/images/ArtisanCrafts.png"
                        width={200}
                        height={200}
                        alt=""
                        className="w-[100px] h-[67px] object-contain"
                    />
                </Link>


                <div className="sm:hidden">
                    <RiMenu2Fill
                        onClick={() => setShowMobileMenu(true)}
                        size={25} className="text-black" cursor="pointer" />
                </div>



                {pathanme !== "/products" &&
                    <nav className="hidden sm:flex gap-x-8  capitalize">
                        {NavigationItems.map(({ id, title, content }) =>
                            <Dropdown
                                key={id}
                                content={content}
                            >{title}</Dropdown>
                        )}

                    </nav>
                }


                <nav className="hidden sm:flex gap-x-4">


                    <IoLocationSharp
                        size={24}
                        cursor="pointer"
                    />
                    <FaRegUser
                        size={24}
                        cursor="pointer"
                    />
                    <FaSearch
                        size={24}
                        cursor="pointer"
                    />
                    <div className="relative">
                        <IoCartOutline
                            size={24}
                            cursor="pointer"
                            onClick={() => setShowCart((prev) => !prev)}
                        />
                        {NumberOfItemsInCart > 0 && <p className="absolute bg-orange-500 text-white p-1 text-xs left-[70%] top-[-20%] w-4 h-4 rounded-full flex items-center justify-center cursor-pointer"
                            onClick={() => setShowCart((prev) => !prev)}
                        >{NumberOfItemsInCart}</p>}
                    </div>
                    {
                        token ?
                            <></> :
                            <Link href="/login">
                                <button className="bg-teal-700 text-white text-sm px-4 py-1 rounded-md hover:bg-teal-900 transition-all ease-in-out duration-300">Login</button>
                            </Link>
                    }
                </nav>


                {showCart && <div
                    onClick={() => setShowCart(false)}
                    className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000057]"></div>}
                <div
                    style={showCart ? { transform: "translateX(0%)" } : { transform: "translateX(100%)" }}
                    className="w-[400px] bg-white fixed z-[9999] shadow-xl right-0 top-0 bottom-0 transition-all ease-in-out duration-300 translate-x-[100%] h-screen px-5 ">
                    <IoCloseCircleOutline
                        onClick={() => setShowCart(false)}
                        className="ml-auto mt-5"
                        size={25}
                        cursor="pointer"
                    />
                    <h2 className="text-center text-[forestgreen] text-xl py-5 font-bold">Cart Items</h2>
                    <div className="">
                        {cartData.length > 0 ?
                            <>{
                                cartData.slice(0, 2).map((cart, index) =>
                                    <div
                                        key={cart._id}
                                        className="flex items-center justify-between bg-white  border-b border-gray-300 py-5  ">
                                        <div className="">
                                            <p className="font-bold">{cart.productId.title}</p>
                                            <p className="text-sm font-bold text-green-600 ">₹{cart.price}</p>
                                            <div className="flex gap-2 items-center">
                                                <p className="text-xs text-gray-600 font-semibold">Qty : {cart.quantity}</p>
                                                <button
                                                    onClick={() => cart.quantity >= 2 && updateQuantity(cart._id, cart.quantity - 1, (cart.quantity - 1) * cart.productId.price, index)}
                                                    className="border border-black px-2 py-1 text-xs rounded-sm hover:bg-gray-200">-</button>
                                                <button
                                                    onClick={() => updateQuantity(cart._id, cart.quantity + 1, (cart.quantity + 1) * cart.productId.price, index)}
                                                    className="border border-black px-2 py-1 text-xs rounded-sm hover:bg-gray-200">+</button>

                                            </div>
                                            <button
                                                onClick={() => removeItemFromCartHandler(cart?._id, index)}
                                                className="text-orange-400 text-xs font-semibold cursor-pointer">Remove</button>

                                        </div>
                                        <img src={cart?.productId?.imgUrl} alt="" width={100} height={100} />
                                    </div>
                                )}
                                {cartData.length > 2 && <div className="text-center text-sm">{cartData.length - 2} more Items</div>}
                            </>
                            : <>

                                <h2 className="text-center py-20">No Items In Cart </h2>
                            </>


                        }
                    </div>
                    {cartData.length > 0 && <p className='text-2xl font-bold text-right py-5'>Subtotal: ₹{subtotal.toFixed(2)}</p>}
                    {
                        cartData.length > 0 &&
                        <>
                            <Link href="/cart">
                                <button
                                    onClick={() => setShowCart(prev => !prev)}
                                    className="mt-5 w-full bg-teal-600 text-white rounded-md py-2 hover:bg-teal-700">Show Details</button>
                            </Link>
                            <Link href="/checkout">
                                <button className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-2">Proceed to Checkout</button>
                            </Link>
                        </>
                    }

                </div>


                {showMobileMenu && <div
                    onClick={() => setShowMobileMenu(false)}
                    className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000057] sm:hidden"></div>}

                <div
                    style={showMobileMenu ? { transform: "translateX(0%)" } : { transform: "translateX(100%)" }}
                    className="sm:hidden w-full bg-white fixed z-[9999] shadow-xl right-0 top-0 bottom-0 transition-all ease-in-out duration-300 translate-x-[100%] h-screen px-5 ">
                    <IoCloseCircleOutline
                        onClick={() => setShowMobileMenu(false)}
                        className="ml-auto mt-5"
                        size={25}
                        cursor="pointer"
                    />



                    <nav className="">
                        {
                            !token ?
                                <>
                                    <p className="mt-10 py-2 px-2 text-xl font-semibold text-gray-600  border-b-2 border-gray-300">
                                        <RiLoginBoxLine
                                            cursor="pointer"
                                            className="inline mr-2"
                                        />
                                        Login

                                    </p>



                                    <p className="mt-10 py-2 px-2 text-xl font-semibold text-gray-600  border-b-2 border-gray-300">
                                        <HiMiniUserPlus
                                            cursor="pointer"
                                            className="inline mr-2"
                                        />
                                        Register</p>
                                </> :
                                <>
                                    <p className="mt-10 py-2 px-2 text-xl font-semibold text-gray-600  border-b-2 border-gray-300">
                                        <FaRegUser
                                            size={24}
                                            cursor="pointer"
                                            className="inline mr-2"
                                        />

                                        My Profile</p>

                                    <p className="mt-10 py-2 px-2 text-xl font-semibold text-gray-600  border-b-2 border-gray-300">
                                        <IoCartOutline
                                            size={24}
                                            cursor="pointer"
                                            className="inline mr-2"
                                        />
                                        My Cart


                                    </p>

                                    <p className="mt-10 py-2 px-2 text-xl font-semibold text-gray-600  border-b-2 border-gray-300">
                                        <GrLogout
                                            size={24}
                                            cursor="pointer"
                                            className="inline mr-2"
                                        />
                                        Logout


                                    </p>
                                </>}
                    </nav>
                </div>


            </header>
        </>
    )
}

export default Navigation


export type cartType = {
    createdAt: string,
    price: number,
    productId: {
        imgUrl: string,
        price: number,
        title: string,
        _id: string
    },
    quantity: number,
    updatedAt: string,
    userId: {
        email: string,
        name: string
    },
    _id: string
}
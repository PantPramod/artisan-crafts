"use client"
import React, { Dispatch, SetStateAction } from 'react'
import Button from '../ui/Button'

type propTypes = {
    selected: "mostPopular" | "whatsNew" | "bestSeller" | "mostPopular"
    setSelected: Dispatch<SetStateAction<"mostPopular" | "whatsNew" | "bestSeller">>
}
const ButtonGroups = ({ selected, setSelected }: propTypes) => {
    return (
        <div className='w-[90%] mx-auto mt-20'>
            <div className='block sm:inline-block'>
                <h1 className=' text-3xl font-bold block mx-auto text-center sm:text-left sm:inline-block'>Best Sellers</h1>
                <div className='mt-2 mb-10 bg-gradient-to-r from-red-500 to-orange-500 h-[5px] sm:h-[10px] rounded-full w-[50px] sm:w-1/2 mx-auto sm:mx-[unset]'></div>
            </div>
            <div className='mb-5 flex flex-col sm:flex-row  gap-6 items-center justify-center'>

                <Button
                    value="Most Popular"
                    onClick={() => setSelected("mostPopular")}
                    className={selected === "mostPopular" ? "bg-white text-black shadow-md " : "bg-black text-white"}

                />

                <Button
                    value="What's New"
                    onClick={() => setSelected("whatsNew")}
                    className={selected === "whatsNew" ? "bg-white text-black shadow-md" : "bg-black text-white"}
                />

                <Button
                    value="Best Seller"
                    onClick={() => setSelected("bestSeller")}
                    className={selected === "bestSeller" ? "bg-white text-black shadow-md" : "bg-black text-white"}
                />
            </div>
        </div>
    )
}

export default ButtonGroups

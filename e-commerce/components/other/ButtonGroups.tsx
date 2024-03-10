"use client"
import React from 'react'
import Button from '../ui/Button'

const ButtonGroups = () => {
    return (
        <div className='w-[90%] mx-auto mt-20'>
            <div className='block sm:inline-block'>
                <h1 className=' text-3xl font-bold block mx-auto text-center sm:text-left sm:inline-block'>Best Sellers</h1>
                <div className='mt-2 mb-10 bg-gradient-to-r from-red-500 to-orange-500 h-[5px] sm:h-[10px] rounded-full w-[50px] sm:w-1/2 mx-auto sm:mx-[unset]'></div>
            </div>
            <div className='mb-5 flex flex-col sm:flex-row border gap-6 items-center justify-center'>

                <Button
                    value="Most Popular"
                    onClick={() => alert()}
                />

                <Button value="What's New" />

                <Button value="Best Seller" />
            </div>
        </div>
    )
}

export default ButtonGroups

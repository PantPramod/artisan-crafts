import React from 'react'
import CategoriesData from './CategoriesData'
import Link from 'next/link'

const Categories = () => {
    
    return (
        <div className="mt-20 w-[90%] mx-auto">
            <div className='block sm:inline-block'>
                <h1 className=' text-3xl font-bold block mx-auto text-center sm:text-left sm:inline-block'>Categories</h1>
                <div className='mt-2 mb-10 bg-gradient-to-r from-red-500 to-orange-500 h-[5px] sm:h-[10px] rounded-full w-[50px] sm:w-1/2 mx-auto sm:mx-[unset]'></div>
            </div>

            <div className='flex flex-wrap gap-x-4 sm:justify-between items-center justify-center gap-y-10'>
                {
                    CategoriesData.map(({ id, imageUrl, name }) => <Link
                        href={`/${name.replaceAll(" ", "-")}`}
                        key={id}
                        className=''
                    >
                        <img
                            src={imageUrl}
                            alt=""
                            className='rounded-full w-[200px] h-[200px] hover:scale-105 transition-all ease-in-out duration-300 cursor-pointer shadow-2xl'
                        />
                        <p className='text-center font-semibold'>{name}</p>
                    </Link>)
                }
            </div>
        </div>
    )
}

export default Categories

import React from 'react'

const BestSellers = () => {
    return (
        <div className='mt-10   relative w-[90%] mx-auto'>
            <img
                src="https://source.unsplash.com/500x500/?handmade,product6"
                alt=""
                className='w-full sm:w-[60%] max-h-[80vh] object-cover'
            />
            <div className='z-[99] max-w-[510px]  bg-white sm:p-6 sm:py-8  sm:absolute sm:top-[55%] sm:left-[55%] sm:-translate-y-1/2'>
                <div className='block sm:inline-block'>
                    <h1 className=' text-3xl font-bold block mx-auto text-center sm:text-left sm:inline-block'>Best Sellers</h1>
                    <div className='mt-2 bg-gradient-to-r from-red-500 to-orange-500 h-[10px] rounded-full w-[50px] sm:w-1/2 mx-auto sm:mx-[unset]'></div>
                </div>
                <p className='text-sm my-3 text-center sm:text-left'>hop American Tourister's best-sellers online. Discover the most popular, top-rated travel gear handpicked by American Tourister fans!</p>
                <button className='shadow-lg  rounded-full px-6 py-2 text-xl font-bold mx-auto sm:mx-[unset] block'>Shop Now</button>
            </div>
        </div>
    )
}

export default BestSellers

import React from 'react'

const Subscription = () => {
    return (
        <div className='bg-gradient-to-r from-pink-600 to-orange-400 py-10 w-[90%] mx-auto mt-20 flex items-center justify-center'>
            <div className='inline-block'>
                <p className='text-center text-white text-xl'>Get the latest news from Artsian Crafts.</p>

                <input
                    type='text'
                    className='border border-white p-2 rounded-full mx-auto block my-4 bg-transparent w-full'
                    placeholder='* Your email address'
                />

                <button className='px-12 py-1.5 font-semibold shadow-lg rounded-full bg-white mx-auto block'>Submit</button>
            </div>
        </div>
    )
}

export default Subscription

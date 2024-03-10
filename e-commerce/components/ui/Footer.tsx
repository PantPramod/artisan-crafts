import React from 'react'

const Footer = () => {
    return (
        <div className='bg-[#272727] text-white'>

            <div className='px-[5%] w-full md:w-[70%] flex justify-between gap-y-10 gap-x-4 flex-wrap'>
                <ul className='pt-10 pb-20 text-xs'>
                    <li className='uppercase text-sm py-2'>Support</li>
                    <li className='py-2'>Service</li>
                    <li className='py-2'>Contact Us</li>
                    <li className='py-2'>Information</li>
                </ul>

                <ul className='pt-10 pb-20 text-xs'>
                    <li className='uppercase text-sm py-2'>QUICK LINKS</li>
                    <li className='py-2'>Damage Policy</li>
                    <li className='py-2'>Care and Cleaning</li>
                    <li className='py-2'>Packing Tips</li>
                    <li className='py-2'>Site Map</li>
                </ul>

                <ul className='pt-10 pb-20 text-xs'>
                    <li className='uppercase text-sm py-2'>Our Company</li>
                    <li className='py-2'>About Artisan Crafts</li>

                </ul>
                <ul className='pt-10 pb-20 text-xs'>
                    <li className='uppercase text-sm py-2'>Account</li>
                    <li className='py-2'>Track Order</li>
                    <li className='py-2'>Sign In</li>
                    <li className='py-2'>Shop All Products</li>

                </ul>
            </div>
        </div>
    )
}

export default Footer

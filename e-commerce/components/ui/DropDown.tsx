'use client'
import Link from 'next/link';
import React, { useState } from 'react';
type propTypes = {
    children: string,
    content: any
}
const Dropdown = ({ children, content }: propTypes) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className='group z-[999]'>
            <div

                className="relative group cursor-pointer py-2">
                <span className='font-semibold'>{children}</span>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-blue-400 transition-[width] ease-in-out duration-700 underline group-hover:w-full "></div>
            </div>

            <div
                className={`absolute mt-3  bg-white left-0 right-0 shadow-lg  w-full transition-all duration-700 transform origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 '
                    }`}
                id="dropdown"
            >
                <div className='flex w-full justify-evenly border-t border-gray-300 '>
                    {
                        content.map(({ heading, items, id }: { heading: any, items: any, id: any }) => (<div key={id} className=' '>
                            <h3 className='font-bold'>{heading}</h3>
                            <ul className="divide-y divide-gray-200 p-4">

                                {
                                    items.map(({ id, title, url }: { id: any, title: any, url: any }) => (<li className="py-2"
                                        key={id}
                                    >
                                        <Link href={`/products?category=${title}`} className="text-blue-500 hover:underline ">
                                            {title}
                                        </Link>
                                    </li>))
                                }
                            </ul>
                        </div>))
                    }
                </div>
            </div>
        </div>
    );
};

export default Dropdown;

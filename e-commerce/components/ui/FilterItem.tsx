'use client'
import React from 'react'

type propTypes = {
    title: string
    onClick: (arg0: string ) => void
    list: string[] 
  
}

const FilterItem = ({ title, onClick, list}: propTypes) => {
    return (
        <div className='py-5 text-xs border-t px-6 border-r'>
            <p className='uppercase font-bold '>{title}</p>
            <ul className='pt-2'>
                {
                    list.map((item) =>
                        <li className='pt-2' key={item}>
                            <input
                                type="checkbox"
                                id={"check-" + item}
                                className='mr-2 bg-white accent-pink-500 cursor-pointer'
                                onClick={() => onClick(item)}
                               
                            />
                            <label htmlFor={"check-" + item} className='cursor-pointer capitalize'>{item}</label>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default FilterItem

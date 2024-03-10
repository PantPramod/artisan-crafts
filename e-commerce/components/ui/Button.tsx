import React from 'react'
import { clsx } from 'clsx'

type propTypes = {
    value?: string
    className?: string
    fullWidth?: boolean
    px?: number
    py?: number
    onClick?:any
}
const Button = (props: propTypes) => {
    return (<input
        type="button"
        value="Set My Value"
        className={clsx(`bg-black text-white px-6 py-2 rounded-full  uppercase  font-bold hover:text-black hover:bg-white shadow-md cursor-pointer `, props?.fullWidth && "w-full")}

        {...props}

    />)
}

export default Button

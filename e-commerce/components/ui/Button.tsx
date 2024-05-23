import React from 'react'
import { clsx } from 'clsx'

type propTypes = {
    value?: string
    className?: string
    fullWidth?: boolean
    px?: number
    py?: number
    onClick?: any

}
const Button = (props: propTypes) => {

    const className = ` px-6 py-2 rounded-full  uppercase  font-bold hover:text-black hover:bg-white shadow-md cursor-pointer ${props.className}`
    return (<input
        type="button"
        value={props.value}
        className={className}
        onClick={props.onClick}
    />)
}

export default Button

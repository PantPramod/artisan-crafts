'use client'
import React, { useState } from 'react'
import ButtonGroups from './ButtonGroups'
import ProductList from './ProductList'

const FeaturedProducts = () => {
    const [selected, setSelected] = useState<"mostPopular" | "whatsNew" | "bestSeller">("mostPopular")
    return (
        <div>
            <ButtonGroups selected={selected} setSelected={setSelected}/>
            <ProductList selected={selected}/>

        </div>
    )
}

export default FeaturedProducts

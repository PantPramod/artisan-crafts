'use client'
import React, { useEffect, useState } from 'react'
import FilterItem from '../ui/FilterItem'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const FilterGroup = () => {
 const [categories, setCategories] = useState<string[]>([])
 const router = useRouter()  
 
 useEffect(()=>{
        getAllCategories() 
    },[])

    const getAllCategories=async()=>{
        try{
       const {data} = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/categories`)
       console.log(data)
       setCategories([...data])
        }catch(err){
          console.log(err)   
        }
    }
    return (
        <>
            <FilterItem
                title="Category"
                list={categories}
                onClick={(arg0) => { router.push(arg0) }}
            
            />
            <FilterItem
                title="Material"
                list={["Wood", "Fabric", "paper"]}
                onClick={(arg0) => { console.log(arg0) }}
            />
             <FilterItem
                title="Discount"
                list={["30", "40", "50"]}
                onClick={(arg0) => { console.log(arg0) }}
            />
            
        </>
    )
}

export default FilterGroup

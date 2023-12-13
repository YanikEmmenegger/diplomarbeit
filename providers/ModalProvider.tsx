'use client'

import {useEffect, useState} from "react";
import FoodModal from "@/components/Food/FoodModal";


const ModalProvider = ()=>{
    const [isMounted, setIsMounted] = useState(false)
    useEffect(()=>{
        setIsMounted(true)

    }, [])

    if (!isMounted){
        return null;
    }
    return (
        <>
            <FoodModal/>
        </>
    )
}
export default ModalProvider

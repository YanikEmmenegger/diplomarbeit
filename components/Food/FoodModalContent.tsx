import {FC, useEffect, useState} from "react";
import {Food, FoodEntry, FoodModalItem} from "@/types/types.db";
import {twMerge} from "tailwind-merge";
import Image from "next/image";
import FoodModalData from "@/components/Food/FoodModalData";
import FoodModalForm from "@/components/Food/FoodModalForm";

interface FoodModalFormProps {
    foodModalItem: FoodModalItem;
}

const FoodModalContent: FC<FoodModalFormProps> = ({foodModalItem}) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(false)
    }, []);

    return (
        <>
            {!loading && (<><FoodModalData food={foodModalItem.food}/><FoodModalForm foodModalItem={foodModalItem}/></>)}
        </>
    )
        ;
}

export default FoodModalContent;
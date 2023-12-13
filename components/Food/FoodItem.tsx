'use client'
import {FC, useState} from "react";
import Image from "next/image";
import Button from "@/components/Button";
import {CiCirclePlus} from "react-icons/ci";
import {Food} from "@/types/types.db";
import {twMerge} from "tailwind-merge";
import useFoodModal from "@/hooks/useFoodModal";

interface FoodItemProps {
    food: Food;
}

const FoodItem: FC<FoodItemProps> = ({food}) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const FoodModal = useFoodModal();
    const handleImageLoaded = () => {
        setImageLoaded(true)
    }
    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">

                    <Image
                        width={100}
                        height={100}
                        className={twMerge("h-12 w-12 transition-opacity flex-none rounded-full bg-gray-50", !imageLoaded ? "opacity-0" : 'opacity-100')}
                        src={food.image || "/images/logo.png"}
                        alt=""
                        onLoadingComplete={handleImageLoaded}
                        loading={"lazy"}
                    />

                <div className="min-w-0  flex-row">
                    <p className="text-sm font-semibold leading-1 text-gray-100">{food.name} {food.id? "✅": "❗️"}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-300">{food.brand} </p>
                    <p className="mt-1 truncate text-[0.6rem] leading-4 text-gray-300">Calories: {food.calories} |
                        F: {food.fat} | C: {food.carbohydrates} | P: {food.protein}</p>
                </div>
            </div>
            <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                    <Button className={" opacity-50 hover:text-red-900"} onClick={()=>FoodModal.onOpen(food)}>
                        <CiCirclePlus></CiCirclePlus>
                    </Button>
            </div>
        </li>
    );
}

export default FoodItem;
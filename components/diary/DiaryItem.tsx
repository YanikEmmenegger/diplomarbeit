'use client'
import {FC, useState} from "react";
import Image from "next/image";
import Button from "@/components/Button";
import {CiCirclePlus} from "react-icons/ci";
import {Food, FoodEntry, FoodModalItem} from "@/types/types.db";
import {twMerge} from "tailwind-merge";
import useFoodModal from "@/hooks/useFoodModal";
import diaryItem from "@/components/diary/DiaryItem";

interface DiaryItemProps {
    foodModalItem: FoodModalItem;
}

const DiaryItem: FC<DiaryItemProps> = ({foodModalItem}) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const FoodModal = useFoodModal();

    const food: Food = foodModalItem.food

    const handleImageLoaded = () => {
        setImageLoaded(true)
    }
    return (
        <li className="flex my-4 cursor-pointer" onClick={()=>FoodModal.onOpen(foodModalItem)}>
            <div className="flex gap-x-4 w-full mx-3">
                <Image
                    width={100}
                    height={100}
                    className={twMerge("h-12 w-12 p-2 transition-opacity flex-none rounded-full bg-gray-50", !imageLoaded ? "opacity-0" : 'opacity-100')}
                    src={food.image ||"/images/logo.png"}
                    alt=""
                    onLoad={handleImageLoaded}
                    loading={"lazy"}
                />
                <div className="w-full flex-row">
                    <p className="text-sm font-semibold leading-1 text-gray-100 text-ellipsis">{food.name}</p>
                    <div className={"w-full flex flex-row justify-between"}>
                        <p className="truncate text-xs leading-5 text-gray-300">{food.brand} | {foodModalItem.serving_size * 100}{food.unit}</p>
                        <p className="truncate text-xs leading-5 text-gray-300">{Math.round(foodModalItem.serving_size*food.calories)}</p>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default DiaryItem;
'use client'
import {FC, useState} from "react";
import Image from "next/image";
import Button from "@/components/Button";
import {CiCirclePlus} from "react-icons/ci";
import {Food, FoodModalItem} from "@/types/types.db";
import {twMerge} from "tailwind-merge";
import useFoodModal from "@/hooks/useFoodModal";

interface FoodItemProps {
    food: Food;
    date: string;
    meal: number;
    id: string;
}

const FoodItem: FC<FoodItemProps> = ({food, date, meal, id}) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const FoodModal = useFoodModal();


    const foodModalItem: FoodModalItem = {
        date: date,
        meal_type: meal,
        food: food,
        serving_size: Math.round(food.serving_factor * 100) / 100,
    }
    const handleImageLoaded = () => {
        setImageLoaded(true)
    }
    return (
        <li id={"food-li-item-" + id} className="food-li-item flex justify-between gap-x-6 py-5 cursor-pointer"
            onClick={() => FoodModal.onOpen(foodModalItem)}>
            <div className="flex min-w-0 gap-x-4">
                <Image
                    width={100}
                    height={100}
                    id={"food-li-image-"+id}
                    className={twMerge("food-li-image h-12 w-12 p-2 transition-opacity flex-none rounded-full bg-gray-50", !imageLoaded ? "opacity-0" : 'opacity-100')}
                    src={food.image || "/images/logo.png"}
                    alt=""
                    onLoad={handleImageLoaded}
                    loading={"lazy"}
                />

                <div className="min-w-0  flex-row">
                    <p id={"food-li-origin-"+id} className="food-li-origin text-sm font-semibold leading-1 text-gray-100">{food.name} {food.id ? "✅" : "❗️"}</p>
                    <p id={"food-li-brand-"+id} className="food-li-brand mt-1 truncate text-xs leading-5 text-gray-300">{food.brand} </p>
                    <p id={"food-li-calories-"+id} className="food-li-calories float-left truncate text-[0.6rem] leading-4 text-gray-300">Calories: {food.calories} | </p>
                    <p id={"food-li-fat-"+id} className="food-li-fat pl-1 float-left truncate text-[0.6rem] leading-4 text-gray-300"> F: {food.fat} </p>
                    <p id={"food-li-carbs-"+id} className="food-li-carbs pl-1 float-left truncate text-[0.6rem] leading-4 text-gray-300"> C: {food.carbohydrates} | </p>
                    <p id={"food-li-protein-"+id} className="food-li-protein pl-1 float-left truncate text-[0.6rem] leading-4 text-gray-300"> P: {food.protein}</p>
                </div>
            </div>
            <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                {/*<Button className={"hover:scale-110 opacity-50"} onClick={() => FoodModal.onOpen(foodModalItem)}>
                    <CiCirclePlus></CiCirclePlus>
                </Button>*/}
            </div>
        </li>
    );
}

export default FoodItem;
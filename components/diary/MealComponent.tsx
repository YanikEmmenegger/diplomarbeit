'use client'
import {FC} from "react";
import {FoodEntry, FoodModalItem, Meal} from "@/types/types.db";
import Button from "@/components/Button";

import DiaryItem from "@/components/diary/DiaryItem";
import {useRouter} from "next/navigation";
import DiaryItemSkeleton from "@/components/diary/DiaryItemSkeleton";

interface MealComponentProps {
    meal: Meal
    meal_type: number
    date: string
}

const MealComponent: FC<MealComponentProps> = ({meal, date, meal_type}) => {
    const router = useRouter();
    return (
        <div id={"diary-meal-"+meal_type} className='p-1 w-full'>
            <div className={"flex flex-row justify-between"}>
                <h1 className={"diary-meal-name text-xl pl-3"}>{meal.name}</h1>
                <h1 className={"diary-meal-calories text-xl pr-3"}>{meal.calories === 0 ? "" : Math.round(meal.calories)}</h1>
            </div>
            <div className={"flex-row hidden"}>
                <p className={"text-xs float-left pl-3 pb-2 border-white border-b-2 mb-1"}>K: {meal.carbohydrates}</p>
                <p className={"text-xs float-left pl-1 pr-1 pb-2 border-white border-b-2 mb-1"}>F: {Math.round(meal.fat)}</p>
                <p className={"text-xs pb-2 border-white border-b-2 mb-1"}>P: {Math.round(meal.protein)}</p>

            </div>
            <div>
                {
                    meal.entries === null ? <DiaryItemSkeleton animate/> : (

                        meal.entries.length === 0 ? <DiaryItemSkeleton/> :
                            (meal.entries.map((entry: any, index) => {
                                    const foodModalItem: FoodModalItem = {
                                        date: date,
                                        meal_type: meal_type,
                                        food: entry.food,
                                        id: entry.id,
                                        serving_size: entry.serving_size
                                    }

                                    //@ts-ignore
                                    return (
                                        <DiaryItem key={index} id={index.toString()} foodModalItem={foodModalItem}/>
                                    )
                                })
                            ))
                }
            </div>
            <Button id={"diary-btn-add-"+meal_type} onClick={() => router.push("/app/food/" + date + "/" + meal_type)}
                    className={" text-sm"}>Hinzufügen</Button>
        </div>
    );
}

export default MealComponent;
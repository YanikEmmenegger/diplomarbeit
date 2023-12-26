import {FC} from "react";
import {FoodEntry, Meal} from "@/types/types.db";
import Button from "@/components/Button";
import FoodItem from "@/components/Food/FoodItem";
import FoodItemSkeleton from "@/components/Food/FoodItemSkeleton";
import toast from "react-hot-toast";

interface MealComponentProps {
    meal: Meal
}

const MealComponent: FC<MealComponentProps> = ({meal}) => {
    return (
        <div className='p-1 w-full'>
            <div className={"flex flex-row justify-between pb-2 border-b-2 border-white"}>
                <h1 className={"text-xl pl-3"}>{meal.name}</h1>
                <h1 className={"text-xl pr-3"}>{meal.calories}</h1>
            </div>
            <div>
                {
                    meal.entries === null ? <FoodItemSkeleton doNotAnimate={false}/> : (

                        meal.entries.length === 0 ? <FoodItemSkeleton doNotAnimate={true}/> :
                            (meal.entries.map((entry, index) => {

                                    console.log(entry);
                                    //@ts-ignore
                                    const foodEntry: FoodEntry = entry;
                                    return (
                                        <div key={index}
                                             className={"flex flex-row justify-between border-b-2 border-white"}>
                                            <FoodItem food={foodEntry.food}/>
                                        </div>
                                    )
                                })
                            ))
                }
            </div>
            <Button onClick={() => toast.error("WIP :D")} className={"w-full"}>Add Entry</Button>
        </div>
    );
}

export default MealComponent;
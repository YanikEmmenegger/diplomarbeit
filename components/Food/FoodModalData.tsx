import {FC} from "react";
import {Food} from "@/types/types.db";
import {twMerge} from "tailwind-merge";
import Image from "next/image";


interface FoodModalDataProps {
    food: Food;
}

const FoodModalData: FC<FoodModalDataProps> = ({food}) => {
    return (
        <div id={"foodmodal-data"} className={"flex flex-col md:flex-row md:gap-16 mt-2 mx-auto items-center"}>
            <Image
                id={"foodmodal-image"}
                width={200}
                height={200}
                className={twMerge("h-20 w-20 p-1 transition-opacity flex-none rounded-full bg-gray-50")}
                src={food?.image || "/images/logo.png"}
                alt=""
                loading={"lazy"}
            />
            <div id={"foodmodal-details"} className={"flex items-center md:items-start flex-col"}>
                <h1 id={"foodmodal-details-name"}
                    className={"font-bold md:text-lg mt-5 md:mt-0 lg:text-xl text-sm"}>{food?.name}</h1>
                <p id={"foodmodal-details-brand"} className={"font-light text-sm"}>{food?.brand || ""} </p>
                <h1 className={"font-bold text-xs mt-2"}>Nährwerte 100g:</h1>
                <div className="min-w-0 mt-0.5 flex-row">
                    <p id={"foodmodal-details-fat"}
                       className="pl-1 float-left truncate text-sm leading-4 text-gray-300"> Fett: {food?.fat} | </p>
                    <p id={"foodmodal-details-carbs"}
                       className="pl-1 float-left truncate text-sm leading-4 text-gray-300"> Kohlenhydrate: {food?.carbohydrates} | </p>
                    <p id={"foodmodal-details-protein"}
                       className="pl-1 float-left truncate text-sm leading-4 text-gray-300"> Proteine: {food?.protein}</p>
                </div>

            </div>
        </div>
    );
}

export default FoodModalData;
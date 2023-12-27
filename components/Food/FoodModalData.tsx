import {FC} from "react";
import {Food} from "@/types/types.db";
import {twMerge} from "tailwind-merge";
import Image from "next/image";


interface FoodModalDataProps {
    food: Food;
}

const FoodModalData: FC<FoodModalDataProps> = ({food}) => {
    return (
        <div className={"flex flex-col md:flex-row md:gap-16 mt-2 mx-auto items-center"}>
            <Image
                width={200}
                height={200}
                className={twMerge("h-20 w-20 p-1 transition-opacity flex-none rounded-full bg-gray-50")}
                src={food?.image || "/images/logo.png"}
                alt=""
                loading={"lazy"}
            />
            <div className={"flex items-center md:items-start flex-col"}>
                <h1 className={"font-bold md:text-lg mt-5 md:mt-0 lg:text-xl text-sm"}>{food?.name}</h1>
                <p className={"font-light text-sm"}>{food?.brand || ""} </p>
                <h1 className={"font-bold text-xs mt-2"}>Nährwerte 100g:</h1>
                <p className={"text-xs"}>Kohlenhydrate: {food?.carbohydrates} | Fett: {food?.fat} | Proteine: {food?.protein}</p>

            </div>
        </div>
    );
}

export default FoodModalData;
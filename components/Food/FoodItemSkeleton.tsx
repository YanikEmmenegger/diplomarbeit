import {FC} from "react";

interface FoodItemProps {
}

const FoodItemSkeleton: FC<FoodItemProps> = ({}) => {
    return (
        <div className="container gap-x-6 py-5 animate-pulse">
            <div className="flex min-w-0 gap-x-4">
                <div className="h-12 w-12 flex-none bg-neutral-300 rounded-full border-CalorieCompass-Primary opacity-50" ></div>
                    <div className="bg-neutral-600 w-1/2 rounded-full "></div>
            </div>
        </div>
    );
}

export default FoodItemSkeleton;
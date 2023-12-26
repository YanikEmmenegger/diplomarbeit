import {FC} from "react";
import {twMerge} from "tailwind-merge";

interface FoodItemSkeletonProps {
    doNotAnimate?: boolean;
}

const FoodItemSkeleton: FC<FoodItemSkeletonProps> = ({doNotAnimate}) => {
    return (
        <div className={twMerge("container px-2", !doNotAnimate ? "animate-pulse": "")}>
        <div className="container gap-x-6 py-5 ">
            <div className="flex min-w-0 gap-x-4">
                <div className="h-12 w-12 flex-none bg-neutral-300 rounded-full border-CalorieCompass-Primary opacity-50" ></div>
                    <div className="bg-neutral-600 w-1/2 rounded-full "></div>
            </div>
        </div>
        </div>
    );
}

export default FoodItemSkeleton;
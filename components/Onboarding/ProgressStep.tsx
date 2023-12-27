import {FC} from "react";
import {twMerge} from "tailwind-merge";

interface ProgressStepProps {
    active: boolean;
    step: number;
}

const ProgressStep: FC<ProgressStepProps> = ({active, step}) => {
    return (
        //create a circle with a number in it
        <div className="flex-1 flex-col mx-auto items-center">
            <div className={twMerge("flex items-center mx-auto transition-all ease-linear duration-200 justify-center w-8 h-8 md:w-10 md:h-10 border-2 border-CalorieCompass-Primary rounded-full", active? "scale-125 bg-CalorieCompass-Primary opacity-100": "scale-100 bg-transparent opacity-50")}>
                <span className={twMerge("transition-all ease-linear duration-200", active? "text-white": "text-CalorieCompass-Primary")}>{step}</span>
            </div>
        </div>
    );
}

export default ProgressStep;
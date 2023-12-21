import {twMerge} from "tailwind-merge";
import {FC, useCallback, useEffect} from "react";

interface StepTwoProps {
    weight: number | null;
    setWeight: (weight: number) => void;
    height: number | null;
    setHeight: (height: number) => void;
    setStepCompleted: (stepCompleted: boolean) => void;
}

const StepTwo: FC<StepTwoProps> = ({weight, setWeight, height, setHeight, setStepCompleted}) => {


    const validateInput = useCallback((input: HTMLInputElement) => {
        if (input.name === "weight") {
            if (parseInt(input.value) < 31 || parseInt(input.value) > 799 || isNaN(parseInt(input.value))) {
                input.className = twMerge(input.className, "border-red-500")
            } else {
                input.className = twMerge(input.className, "border-CalorieCompass-Primary")
            }
        }
        if (input.name === "height") {
            if (parseInt(input.value) < 101 || parseInt(input.value) > 249 || isNaN(parseInt(input.value))) {
                input.className = twMerge(input.className, "border-red-500")
            } else {
                input.className = twMerge(input.className, "border-CalorieCompass-Primary")
            }
        }
    }, []);


    useEffect(() => {
        if (weight && height) {
            if (!isNaN(weight) && !isNaN(height) && weight > 30 && weight < 800 && height > 100 && height < 250) {
                setStepCompleted(true)
            }else
            {
                setStepCompleted(false)
            }
        }
    }, [weight, height, setStepCompleted])

    return (
        <div className="">
            <label className="block mt-40 mb-2 text-white">
                Gewicht (kg):
            </label>

            <input

                type="text"
                name={"weight"}
                placeholder="Gewicht"
                value={weight || ""}
                pattern={"[0-9]{3}"}
                onChange={(e) => {
                    setWeight(parseInt(e.target.value))
                    validateInput(e.target)
                }}
                className="h-auto rounded-lg p-4 opacity-50 focus:opacity-100 transition-opacity outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary w-full"
            />
            <label className="block mb-2 text-white">
                Grösse (cm):
            </label>

            <input
                type="text"
                placeholder="Grösse"
                name={"height"}
                value={height || ""}
                pattern={"[0-9]{3}"}
                onChange={(e) => {
                    setHeight(parseInt(e.target.value))
                    validateInput(e.target)
                }}
                className="h-auto rounded-lg p-4 opacity-50 focus:opacity-100 transition-opacity outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary w-full"
            />
        </div>
    )
}

export default StepTwo;

import {twMerge} from "tailwind-merge";
import {FC, useCallback, useEffect} from "react";
import OnboardingInput from "@/components/Onboarding/OnboardingInput";
import {he} from "date-fns/locale";

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
            } else {
                setStepCompleted(false)
            }
        } else {
            setStepCompleted(false)
        }
    }, [weight, height, setStepCompleted])

    return (
        <div className="">
            <h1 className="text-xl text-white text-center mb-2">Gewicht & Grösse</h1>

            <OnboardingInput value={weight ? weight : ""} onChange={(input) => {
                setWeight(parseInt(input.value))
                validateInput(input)
            }} name={"weight"} placeholder={"Gewicht"} pattern={"[0-9]{3}"} label={"Gewicht (Kg)"}/>

            <OnboardingInput value={height ? height : ""} onChange={(input) => {
                setHeight(parseInt(input.value))
                validateInput(input)
            }} name={"height"} placeholder={"Grösse"} pattern={"[0-9]{3}"} label={"Grösse (cm)"}/>
        </div>
    )
}

export default StepTwo;

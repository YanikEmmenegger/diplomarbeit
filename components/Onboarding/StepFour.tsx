import {FC, useEffect} from "react";
import {twMerge} from "tailwind-merge";

interface StepFourProps {
    goal: number
    setGoal: (goal: number) => void;
    setStepCompleted: (stepCompleted: boolean) => void;
}

const StepFour: FC<StepFourProps> = ({goal, setGoal, setStepCompleted}) => {

    const handleButtonClick = (newActivityLevel: number) => {
        setGoal(newActivityLevel)
    }
    useEffect(() => {
        setStepCompleted(true)
    }, [setStepCompleted]);

    return (
        <div className="">
            <div className="flex flex-col">
                <h1 className="text-xl text-white text-center mb-4">Was ist dein Ziel?</h1>
                <button id={"onboard-btn-goal-1"}
                    onClick={() => handleButtonClick(1)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-4 opacity-75 ease-in-out duration-500  transition outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary", goal === 1 ? 'bg-CalorieCompass-Primary goal-active' : 'bg-transparent')}>
                    Gewicht verlieren
                </button>
                <button id={"onboard-btn-goal-2"}
                    onClick={() => handleButtonClick(2)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-4 ease-in-out duration-500 opacity-75 transition outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary", goal === 2 ? 'bg-CalorieCompass-Primary goal-active' : 'bg-transparent')}>
                    Gewicht halten
                </button>
                <button id={"onboard-btn-goal-3"}
                    onClick={() => handleButtonClick(3)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-4 opacity-75 ease-in-out duration-500 transition outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary", goal === 3 ? 'bg-CalorieCompass-Primary goal-active' : 'bg-transparent')}>
                    Gewicht aufbauen
                </button>
            </div>
        </div>
    );
}

export default StepFour;
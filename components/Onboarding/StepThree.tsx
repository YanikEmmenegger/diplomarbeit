import {FC, useEffect} from "react";
import {twMerge} from "tailwind-merge";

interface StepThreeProps {
    activityLevel: number
    setActivityLevel: (activityLevel: number) => void;
    setStepCompleted: (stepCompleted: boolean) => void;
}

const StepThree: FC<StepThreeProps> = ({activityLevel, setActivityLevel, setStepCompleted}) => {

    const handleButtonClick = (newActivityLevel: number) => {
        setActivityLevel(newActivityLevel)
    }
    useEffect(() => {
            setStepCompleted(true)
    }, [setStepCompleted]);

    return (
        <div className="">
            <div className="flex flex-col">
                <h1 className="text-xl text-white text-center mb-4">Wie aktiv bist du im Alltag?</h1>
                <button id={"onboard-btn-activity-level-1"}
                    onClick={() => handleButtonClick(1)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-4 opacity-75 ease-in-out duration-500  transition outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary", activityLevel === 1 ? 'bg-CalorieCompass-Primary level-active' : 'bg-transparent')}>
                    Praktisch keine Aktivität
                </button>
                <button id={"onboard-btn-activity-level-2"}
                    onClick={() => handleButtonClick(2)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-4 ease-in-out duration-500 opacity-75 transition outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary", activityLevel === 2 ? 'bg-CalorieCompass-Primary level-active' : 'bg-transparent')}>
                    Wenig aktiv
                </button>
                <button id={"onboard-btn-activity-level-3"}
                    onClick={() => handleButtonClick(3)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-4 opacity-75 ease-in-out duration-500 transition outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary", activityLevel === 3 ? 'bg-CalorieCompass-Primary level-active' : 'bg-transparent')}>
                    Aktiv
                </button>
                <button id={"onboard-btn-activity-level-4"}
                    onClick={() => handleButtonClick(4)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-4 opacity-75 ease-in-out duration-500 transition outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary", activityLevel === 4 ? 'bg-CalorieCompass-Primary level-active' : 'bg-transparent')}>
                    Sehr aktiv
                </button>
            </div>
        </div>
    );
}

export default StepThree;
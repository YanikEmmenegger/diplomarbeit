import {FC} from "react";
import {twMerge} from "tailwind-merge";
import ProgressStep from "@/components/Onboarding/ProgressStep";

interface ProgressProps {
    step: number;
}

const Progress: FC<ProgressProps> = ({step}) => {
    return (
        <>
            <div className="flex flex-row mb-4">
                <ProgressStep active={step===1} step={1}/>
                <ProgressStep active={step===2} step={2}/>
                <ProgressStep active={step===3} step={3}/>
                <ProgressStep active={step===4} step={4}/>
                <ProgressStep active={step===5} step={5}/>
            </div>
        </>
    );
}

export default Progress;
import {FC} from "react";

import OnboardingNavigation from "@/components/Onboarding/OnboardingNavigation";

interface StepProps {
    step: number;
}

const Step: FC<StepProps> = ({step}) => {


    return (
        <>
            <h1 className="md:text-5xl text-xl font-bold text-center pb-3 border-b-2">Schritt {step}</h1>

        </>
    );
}

export default Step;
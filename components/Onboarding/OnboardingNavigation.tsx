import {FC} from "react";
import Button from "@/components/Button";


interface OnboardingNavigationProps {
    currentStep: number;
    onNext: () => void;
    onBack: () => void;
}

const OnboardingNavigation: FC<OnboardingNavigationProps> = ({currentStep, onNext, onBack}) => {
    return (
        <div className="fixed bottom-10 mx-auto w-4/5 md:w-1/2">
            <div className="flex-row relative">
                <Button disabled={currentStep ===1} onClick={onBack} className="float-left">
                    Zurück
                </Button>
                <Button onClick={onNext} className="float-right">
                    {currentStep === 5 ? "Abschliessen" : "Weiter"}
                </Button>
            </div>
        </div>
    );
}

export default OnboardingNavigation;
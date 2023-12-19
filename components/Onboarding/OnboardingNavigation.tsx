'use client'
import {FC} from "react";
import Button from "@/components/Button";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

interface OnboardingNavigationProps {
    setStep: (step: number) => void;
    step: number;
}

const OnboardingNavigation: FC<OnboardingNavigationProps> = ({setStep, step}) => {

    const router = useRouter();



    const nextStep = () => {
        if (step !== 3) {
            setStep(step + 1)
        }else{
            toast.success("Willkommen bei CalorieCompass 😃")
            router.push("/app")
        }
    }
    const prevStep = () => {
        setStep(step - 1)
    }

    return (
        <div className="fixed bottom-10 w-4/5 md:w-1/2">
            <div className="flex-row relative">
                <Button disabled={step ===1} onClick={() => prevStep()} className="float-left">
                    Zurück
                </Button>
                <Button onClick={() => nextStep()} className="float-right">
                    {step === 3 ? "Abschliessen" : "Weiter"}
                </Button>
            </div>
        </div>
    );
}

export default OnboardingNavigation;
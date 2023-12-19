'use client'
import {FC, useEffect, useState} from "react";
import {User} from "@/types/types.db";
import axios from "axios";
import OnboardingNavigation from "@/components/Onboarding/OnboardingNavigation";


interface OnboardingProps {
    User: User;
}

const Onboarding: FC<OnboardingProps> = ({User}) => {

    const [user, setUser] = useState<User>(User);
    const [step, setStep] = useState<number>(1);

    const [loading, setLoading] = useState<boolean>(false);


    return (
        <div className='ENTER_COMPONENT_CLASS'>
            <OnboardingNavigation step={step} setStep={setStep}/>
        </div>
    );
}


export default Onboarding;
import {User} from "@/types/types.db";
import {twMerge} from "tailwind-merge";
import {FC, useCallback, useEffect, useMemo} from "react";
import OnboardingInput from "@/components/Onboarding/OnboardingInput";

interface StepOneProps {
    user: User
    setUser: (user: User | null) => void;
    setStepCompleted?: (stepCompleted: boolean) => void;
}

const StepOne: FC<StepOneProps> = ({user, setUser, setStepCompleted}) => {
    const changeGender = (genderNumber: number) => {
        setUser({...user, gender: genderNumber})
    }
    const regex = useMemo(() => {
        return {
            email: /\S+@\S+\.\S+/,
            name: /^[a-zA-ZäöüÄÖÜß]{2,}(?: [a-zA-ZäöüÄÖÜß]+){0,2}$/,
            date: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.((19|20)\d\d)$/,
        }

    }, []);
    const validateInput = useCallback((input: HTMLInputElement) => {
        if (input.name === "email") {
            if (!regex.email.test(input.value)) {
                input.className = twMerge(input.className, "border-red-500")
            } else {
                input.className = twMerge(input.className, "border-CalorieCompass-Primary")
            }
        }
        if (input.name === "name") {
            if (!regex.name.test(input.value)) {
                input.className = twMerge(input.className, "border-red-500")
            } else {
                input.className = twMerge(input.className, "border-CalorieCompass-Primary")
            }
        }
        if (input.name === "firstname") {
            if (!regex.name.test(input.value)) {
                input.className = twMerge(input.className, "border-red-500")
            } else {
                input.className = twMerge(input.className, "border-CalorieCompass-Primary")
            }
        }
        if (input.name === "birthdate") {
            if (!regex.date.test(input.value)) {
                input.className = twMerge(input.className, "border-red-500")
            } else {
                input.className = twMerge(input.className, "border-CalorieCompass-Primary")
            }
        }
    }, [regex.date, regex.email, regex.name]);

    useEffect(() => {
            if (setStepCompleted) {
                if (regex.email.test(user.email!) && regex.name.test(user.name!) && regex.name.test(user.firstname!) && regex.date.test(user.birthdate!) && user.name && user.firstname && user.email && user.birthdate) {
                    setStepCompleted(true)
                } else {
                    setStepCompleted(false)
                }
            }
        },
        [regex.date, regex.email, regex.name, setStepCompleted, user.birthdate, user.email, user.firstname, user.name]);
    return (
        <div className="">
            <h1 className="text-xl text-white text-center mb-2">Persönliche Daten</h1>

            <OnboardingInput value={user.name || ""} onChange={(input) => {
                setUser({...user, [input.name]: input.value})
                validateInput(input)
            }} name={"name"} placeholder="Name" label={"Name:"}/>


            <OnboardingInput value={user.firstname || ""} onChange={(input) => {
                setUser({...user, [input.name]: input.value})
                validateInput(input)
            }
            } name={"firstname"} placeholder="Vorname" label={"Vorname:"}/>

            <OnboardingInput value={user.email || ""} onChange={(input) => {
                setUser({...user, [input.name]: input.value})
                validateInput(input)
            }} name={"email"} placeholder="Email" label={"Email:"}/>

            <div className="flex mt-2 flex-row">
                <button id={"onboard-btn-gender-male"}
                    onClick={() => changeGender(1)}
                    className={twMerge("onboard-button-gender flex-1 mx-1 h-auto rounded-lg p-3 opacity-75  transition outline-none mb-3 border-2 bg-transparent border-CalorieCompass-Primary", user.gender! === 1 ? 'bg-CalorieCompass-Primary gender-active' : 'bg-transparent')}>
                    Mann
                </button>

                <button id={"onboard-btn-gender-female"}
                    onClick={() => changeGender(2)}
                    className={twMerge("onboard-button-gender flex-1 mx-1 h-auto rounded-lg p-3 opacity-75 transition outline-none mb-3 border-2 bg-transparent border-CalorieCompass-Primary", user.gender! === 2 ? 'bg-CalorieCompass-Primary gender-active' : 'bg-transparent')}>
                    Frau
                </button>
            </div>
            <OnboardingInput value={user.birthdate || ""} onChange={(input) => {
                setUser({...user, [input.name]: input.value})
                validateInput(input)
            }} name={"birthdate"} placeholder="Geburtsdatum" label={"Geburtsdatum:"}/>

        </div>
    );
};

export default StepOne;

import {User} from "@/types/types.db";
import {twMerge} from "tailwind-merge";
import {FC, useCallback, useEffect, useMemo} from "react";

interface StepOneProps {
    user: User
    setUser: (user: User | null) => void;
    setStepCompleted: (stepCompleted: boolean) => void;
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
            if (regex.email.test(user.email!) && regex.name.test(user.name!) && regex.name.test(user.firstname!) && regex.date.test(user.birthdate!) && user.name && user.firstname && user.email && user.birthdate) {
                setStepCompleted(true)
            } else {
                setStepCompleted(false)
            }
        },
        [regex.date, regex.email, regex.name, setStepCompleted, user.birthdate, user.email, user.firstname, user.name]);
    return (
        <div className="">
            <label className="block mb-1 text-white">
                Name:
            </label>

            <input
                type="text"
                name={"name"}
                placeholder="Name"
                value={user.name || ""}
                onChange={(e) => {
                    setUser({...user, [e.target.name]: e.target.value})
                    validateInput(e.target)
                }}
                className="h-auto rounded-lg p-4 opacity-50 focus:opacity-100 transition-opacity outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary w-full"
            />
            <label className="block mb-2 text-white">
                Vorname:
            </label>

            <input
                type="text"
                placeholder="Name"
                name={"firstname"}
                value={user.firstname || ""}
                onChange={(e) => {
                    setUser({...user, [e.target.name]: e.target.value})
                    validateInput(e.target)
                }}
                className="h-auto rounded-lg p-4 opacity-50 focus:opacity-100 transition-opacity outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary w-full"
            />
            <label className="block mb-1 text-white">
                Vorname:
            </label>

            <input
                type="text"
                placeholder="Email"
                name={"email"}
                value={user.email || ""}
                onChange={(e) => {
                    setUser({...user, [e.target.name]: e.target.value})
                    validateInput(e.target)
                }}
                className="h-auto rounded-lg p-4 opacity-50 focus:opacity-100 transition-opacity outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary w-full"
            />
            <div className="flex flex-row">
                <button
                    onClick={() => changeGender(1)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-4 opacity-75  transition outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary", user.gender! === 1 ? 'bg-CalorieCompass-Primary' : 'bg-transparent')}>
                    Mann
                </button>

                <button
                    onClick={() => changeGender(2)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-4 opacity-75 transition outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary", user.gender! === 2 ? 'bg-CalorieCompass-Primary' : 'bg-transparent')}>
                    Frau
                </button>
            </div>
            <label className="block mb-1 text-white">
                Vorname:
            </label>

            <input
                type="text"
                placeholder="Geburtsdatum"
                name={"birthdate"}
                value={user.birthdate || ""}
                onChange={(e) => {
                    setUser({...user, [e.target.name]: e.target.value})
                    validateInput(e.target)
                }}
                className="h-auto rounded-lg p-4 opacity-50 focus:opacity-100 transition-opacity outline-none mb-4 border-2 bg-transparent border-CalorieCompass-Primary w-full"
            />
        </div>
    );
};

export default StepOne;

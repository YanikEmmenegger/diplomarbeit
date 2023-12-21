'use client';
import {FC, useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {User} from "@/types/types.db";
import OnboardingInput from "@/components/Onboarding/OnboardingInput";
import {twMerge} from "tailwind-merge";
import SettingSaveButton from "@/components/Settings/SettingSaveButton";

interface PersonalSettingsProps {

}

const PersonalSettings: FC<PersonalSettingsProps> = ({}) => {


    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get("/api/user/details")
            console.log(response.data)
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        fetchUserDetails().finally(() => setLoading(false));
    }, []);

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
    const changeGender = (genderNumber: number) => {
        setUser({...user!, gender: genderNumber})
    }


    return (
        <div className='ENTER_COMPONENT_CLASS'>
            {loading ? <div className="text-center">Loading...</div> :(
                <>
                <h1 className="text-xl text-white text-center mb-2">Persönliche Daten</h1>

                <OnboardingInput value={user!.name || ""} onChange={(input) => {
                    setUser({...user!, [input.name]: input.value})
                    validateInput(input)
                }} name={"name"} placeholder="Name" label={"Name:"}/>


                <OnboardingInput value={user!.firstname || ""} onChange={(input) => {
                    setUser({...user!, [input.name]: input.value})
                    validateInput(input)
                }
                } name={"firstname"} placeholder="Vorname" label={"Vorname:"}/>

                <OnboardingInput value={user!.email || ""} onChange={(input) => {
                    setUser({...user!, [input.name]: input.value})
                    validateInput(input)
                }} name={"email"} placeholder="Email" label={"Email:"}/>

                <div className="flex mt-2 flex-row">
                    <button
                        onClick={() => changeGender(1)}
                        className={twMerge("flex-1 mx-1 h-auto rounded-lg p-3 opacity-75  transition outline-none mb-3 border-2 bg-transparent border-CalorieCompass-Primary", user!.gender! === 1 ? 'bg-CalorieCompass-Primary' : 'bg-transparent')}>
                        Mann
                    </button>

                    <button
                        onClick={() => changeGender(2)}
                        className={twMerge("flex-1 mx-1 h-auto rounded-lg p-3 opacity-75 transition outline-none mb-3 border-2 bg-transparent border-CalorieCompass-Primary", user!.gender! === 2 ? 'bg-CalorieCompass-Primary' : 'bg-transparent')}>
                        Frau
                    </button>
                </div>
                <OnboardingInput value={user!.birthdate || ""} onChange={(input) => {
                    setUser({...user!, [input.name]: input.value})
                    validateInput(input)
                }} name={"birthdate"} placeholder="Geburtsdatum" label={"Geburtsdatum:"}/>
                    <SettingSaveButton onClick={()=>{}} active={false}/>
                </>
            )}
        </div>
    );
}

export default PersonalSettings;
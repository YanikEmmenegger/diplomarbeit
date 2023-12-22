'use client';
import {FC, useCallback, useEffect, useMemo, useState} from "react";
import axios from "axios";
import {UserDetails} from "@/types/types.db";
import OnboardingInput from "@/components/Onboarding/OnboardingInput";
import {twMerge} from "tailwind-merge";
import SettingSaveButton from "@/components/Settings/SettingSaveButton";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface PersonalSettingsProps {

}

const PersonalSettings: FC<PersonalSettingsProps> = ({}) => {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const [oldUserDetails, setOldUserDetails] = useState<UserDetails | null>(null);

    const [activateSaveButton, setActivateSaveButton] = useState<boolean>(false);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get("/api/user/details")
            console.log(response.data)
            setUserDetails(response.data);
            setOldUserDetails(response.data)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const safeUserDetails = async () => {
        try {
            await toast.promise(axios.patch("/api/user/details", userDetails) , {
                success: 'Daten gespeichert',
                error: 'Fehler beim speichern',
                loading: 'Speichern...',
            })
            router.push("/app/settings")
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }


    useEffect(() => {
        fetchUserDetails().finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (userDetails && oldUserDetails) {
            const userDetailsString = JSON.stringify(userDetails);
            const oldUserDetailsString = JSON.stringify(oldUserDetails);

            const isValidDetails =
                userDetailsString !== oldUserDetailsString &&
                regex.email.test(userDetails.email!) &&
                regex.name.test(userDetails.name!) &&
                regex.name.test(userDetails.firstname!) &&
                regex.date.test(userDetails.birthdate!) &&
                userDetails.name &&
                userDetails.firstname &&
                userDetails.email &&
                userDetails.birthdate;

            setActivateSaveButton(isValidDetails as boolean);
        } else {
            setActivateSaveButton(false);
        }
    }, [userDetails]);



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
        setUserDetails({...userDetails!, gender: genderNumber})
    }


    return (
        <div className='ENTER_COMPONENT_CLASS'>
            {loading ? <div className="text-center">Loading...</div> : (
                <>
                    <h1 className="text-xl text-white text-center mb-2">Persönliche Daten</h1>

                    <OnboardingInput value={userDetails!.name || ""} onChange={(input) => {
                        setUserDetails({...userDetails!, [input.name]: input.value})
                        validateInput(input)
                    }} name={"name"} placeholder="Name" label={"Name:"}/>


                    <OnboardingInput value={userDetails!.firstname || ""} onChange={(input) => {
                        setUserDetails({...userDetails!, [input.name]: input.value})
                        validateInput(input)
                    }
                    } name={"firstname"} placeholder="Vorname" label={"Vorname:"}/>

                    <OnboardingInput value={userDetails!.email || ""} onChange={(input) => {
                        setUserDetails({...userDetails!, [input.name]: input.value})
                        validateInput(input)
                    }} name={"email"} placeholder="Email" label={"Email:"}/>

                    <div className="flex mt-2 flex-row">
                        <button
                            onClick={() => changeGender(1)}
                            className={twMerge("flex-1 mx-1 h-auto rounded-lg p-3 opacity-75  transition outline-none mb-3 border-2 bg-transparent border-CalorieCompass-Primary", userDetails!.gender! === 1 ? 'bg-CalorieCompass-Primary' : 'bg-transparent')}>
                            Mann
                        </button>

                        <button
                            onClick={() => changeGender(2)}
                            className={twMerge("flex-1 mx-1 h-auto rounded-lg p-3 opacity-75 transition outline-none mb-3 border-2 bg-transparent border-CalorieCompass-Primary", userDetails!.gender! === 2 ? 'bg-CalorieCompass-Primary' : 'bg-transparent')}>
                            Frau
                        </button>
                    </div>
                    <OnboardingInput value={userDetails!.birthdate || ""} onChange={(input) => {
                        setUserDetails({...userDetails!, [input.name]: input.value})
                        validateInput(input)
                    }} name={"birthdate"} placeholder="Geburtsdatum" label={"Geburtsdatum:"}/>
                    <SettingSaveButton text={"Speichern"} onClick={safeUserDetails} active={activateSaveButton}/>
                </>
            )}
        </div>
    );
}

export default PersonalSettings;
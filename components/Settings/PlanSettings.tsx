import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import {UserDetails, UserPlan} from "@/types/types.db";
import toast from "react-hot-toast";
import {twMerge} from "tailwind-merge";
import OnboardingInput from "@/components/Onboarding/OnboardingInput";
import SettingSaveButton from "@/components/Settings/SettingSaveButton";
import axios from "axios";
import {set} from "date-fns";

interface PlanSettingsProps {

}

const PlanSettings: FC<PlanSettingsProps> = ({}) => {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);
    const [userPlan, setUserPlan] = useState<UserPlan | null>(null);

    const [oldUserPlan, setOldUserPlan] = useState<UserPlan | null>(null);

    const [activateSaveButton, setActivateSaveButton] = useState<boolean>(false);

    const fetchUserPlan = async () => {
        try {
            const response = await axios.get("/api/user/plan")
            setUserPlan(response.data);
            setOldUserPlan(response.data)
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const safeUserPlan = async () => {
        try {
            await toast.promise(axios.patch("/api/user/plan", userPlan), {
                success: 'Daten gespeichert',
                error: 'Fehler beim speichern',
                loading: 'Speichern...',
            })
            router.push("/app/settings")
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
    const calculateCalories = useCallback(() => {
        if (userPlan) {
            return (userPlan!.goal_fat ? userPlan!.goal_fat * 9 : 0) +
                (userPlan!.goal_protein ? userPlan!.goal_protein * 4 : 0) +
                (userPlan!.goal_carbs ? userPlan!.goal_carbs * 4 : 0)
        }
    }, [userPlan])

    const validateInput = useCallback((input: HTMLInputElement) => {

        //check if input is a number and not empty and not null and not undefined and not 0 and not negative
        if (parseInt(input.value) < 1 || isNaN(parseInt(input.value))) {
            input.className = twMerge(input.className, "border-red-500")
        } else {
            input.className = twMerge(input.className, "border-CalorieCompass-Primary")
        }

    }, []);


    useEffect(() => {
        fetchUserPlan().finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        // Berechnen Sie die Kalorien basierend auf den neuen Werten
        if (userPlan) {
            const newCalories =
                (userPlan.goal_fat ? userPlan.goal_fat * 9 : 0) +
                (userPlan.goal_protein ? userPlan.goal_protein * 4 : 0) +
                (userPlan.goal_carbs ? userPlan.goal_carbs * 4 : 0);
            setUserPlan({...userPlan, goal_calories: newCalories})
        }

    }, [userPlan?.goal_carbs, userPlan?.goal_protein, userPlan?.goal_fat, setUserPlan]);

    useEffect(() => {
        if (userPlan && oldUserPlan) {
            const userPlanString = JSON.stringify(userPlan);
            const oldUserPlanString = JSON.stringify(oldUserPlan);

            const isValidPlan =
                userPlanString !== oldUserPlanString &&
                !isNaN(userPlan.goal_carbs!) &&
                !isNaN(userPlan.goal_fat!) &&
                !isNaN(userPlan.goal_protein!);

            setActivateSaveButton(isValidPlan as boolean);
        } else {
            setActivateSaveButton(false);
        }

    }, [userPlan]);


    return (
        <>
            <h1 className="text-xl text-white text-center mb-4">Dein Plan: </h1> {loading && !userPlan ?
            <div className="text-center">Loading...</div> : (
                <>

                    <OnboardingInput value={userPlan!.goal_carbs || ""} onChange={(input) => {
                        setUserPlan({
                            ...userPlan,
                            [input.name]: parseInt(input.value),
                            goal_calories: calculateCalories()
                        })
                        validateInput(input)
                    }} name={'goal_carbs'} pattern={"[0-9]{3}"}
                                     placeholder={oldUserPlan?.goal_carbs?.toString() || ""}
                                     label={'Kohlenhydrate(aktuell: ' + oldUserPlan?.goal_carbs! + 'g)'}/>

                    <OnboardingInput value={userPlan!.goal_fat || ""} onChange={(input) => {
                        setUserPlan({
                            ...userPlan,
                            [input.name]: parseInt(input.value),
                            goal_calories: calculateCalories()
                        })
                        validateInput(input)
                    }} name={'goal_fat'} pattern={"[0-9]{3}"}
                                     placeholder={oldUserPlan?.goal_fat?.toString() || ""}
                                     label={'Fett(aktuell: ' + oldUserPlan?.goal_fat! + 'g)'}/>

                    <OnboardingInput value={userPlan!.goal_protein || ""} onChange={(input) => {
                        setUserPlan({
                            ...userPlan,
                            [input.name]: parseInt(input.value),
                            goal_calories: calculateCalories()
                        })
                        validateInput(input)
                    }
                    } name={'goal_protein'} pattern={"[0-9]{3}"}
                                     placeholder={oldUserPlan?.goal_protein?.toString() || ""}
                                     label={'Protein(aktuell: ' + oldUserPlan?.goal_protein! + 'g)'}/>

                    <h2 className="text-lg text-white text-start mb-4">Kalorienziel: {userPlan!.goal_calories} kcal</h2>

                    <SettingSaveButton text={"Speichern"} onClick={safeUserPlan} active={activateSaveButton}/>
                </>
            )}
        </>
    )
}

export default PlanSettings;
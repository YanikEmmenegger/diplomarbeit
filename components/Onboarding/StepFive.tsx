import {FC, useCallback, useEffect, useState} from "react";
import {User} from "@/types/types.db";
import {calculateCaloricNeeds} from "@/actions/calorieCalculator";
import {twMerge} from "tailwind-merge";
import OnboardingInput from "@/components/Onboarding/OnboardingInput";

interface StepFiveProps {
    weight: number
    height: number
    activityLevel: number
    user: User
    goal: number
    setUser: (user: User | null) => void;
    setStepCompleted: (stepCompleted: boolean) => void;
}

interface Macronutrients {
    protein: number;
    fat: number;
    carbohydrates: number;
}

interface CaloricNeedsResult {
    totalCalories: number;
    macronutrients: Macronutrients;
}

const StepFive: FC<StepFiveProps> = ({weight, height, activityLevel, user, setUser, setStepCompleted, goal}) => {

    //calculate age from birthdate and set it to user.age format is dd.mm.yyyy example 26.05.1999
    const birthday = user.birthdate!.split('.')
    const age = new Date().getFullYear() - parseInt(birthday![2])

    const validateInput = useCallback((input: HTMLInputElement) => {

        //check if input is a number and not empty and not null and not undefined and not 0 and not negative
        if (parseInt(input.value) < 0 || isNaN(parseInt(input.value))) {
            input.className = twMerge(input.className, "border-red-500")
        } else {
            input.className = twMerge(input.className, "border-CalorieCompass-Primary")
        }

    }, []);
    const calculateCalories = useCallback(() => {
        return (user.goal_fat ? user.goal_fat * 9 : 0) +
            (user.goal_protein ? user.goal_protein * 4 : 0) +
            (user.goal_carbs ? user.goal_carbs * 4 : 0)
    }, [user.goal_carbs, user.goal_fat, user.goal_protein])


    const [loading, setLoading] = useState<boolean>(true)
    const [createdPlan, setCreatedPlan] = useState<CaloricNeedsResult | null>()

    useEffect(() => {
        const getPlan = async () => {
            const result = await calculateCaloricNeeds(weight, height, age, activityLevel, goal); // Weight loss goal

            const calories = result.totalCalories
            const protein = result.macronutrients.protein
            const carbs = result.macronutrients.carbohydrates
            const fat = result.macronutrients.fat
            setCreatedPlan(result)
            setUser({...user, goal_calories: calories, goal_protein: protein, goal_carbs: carbs, goal_fat: fat})
        }
        getPlan().finally(() => setLoading(false))
        //setLoading(false)
    }, [])

    useEffect(() => {
        // Berechnen Sie die Kalorien basierend auf den neuen Werten
        const newCalories =
            (user.goal_fat ? user.goal_fat * 9 : 0) +
            (user.goal_protein ? user.goal_protein * 4 : 0) +
            (user.goal_carbs ? user.goal_carbs * 4 : 0);
        setUser({...user, goal_calories: newCalories})

    }, [user.goal_fat, user.goal_protein, user.goal_carbs, setUser]);

    useEffect(() => {
        if (user.goal_protein && user.goal_carbs && user.goal_fat) {
            setStepCompleted(true)
            setUser({...user, onboarding_complete: true})
        } else {
            setStepCompleted(false)
        }
    }, [user.goal_protein, user.goal_carbs, user.goal_fat, setStepCompleted])

    return (
        <div className='ENTER_COMPONENT_CLASS'>
            {loading ? "Erstelle Plan..." : (
                <>
                    <h1 className="text-xl text-white text-center mb-4">Dein Plan: </h1>

                    <p className="text-white text-xs text-start mb-4">Du kannst dein Plan und die Kalorien anpassen, in
                        dem du die Makrowerte änderst, der Vorgeschlagene Plan wurde durch deinen Angaben erstellt - du
                        kannst diesen Plan jederzeit ändern</p>


                    <OnboardingInput value={user.goal_carbs || ""} onChange={(input) => {
                        setUser({...user, [input.name]: parseInt(input.value), goal_calories: calculateCalories()})
                        validateInput(input)
                    }} name={'goal_carbs'} pattern={"[0-9]{3}"}
                                     placeholder={createdPlan?.macronutrients.carbohydrates.toString() || ""}
                                     label={'Kohlenhydrate(empfohlen: ' + createdPlan?.macronutrients.carbohydrates + 'g)'}/>

                    <OnboardingInput value={user.goal_fat || ""} onChange={(input) => {
                        setUser({...user, [input.name]: parseInt(input.value), goal_calories: calculateCalories()})
                        validateInput(input)
                    }} name={'goal_fat'} pattern={"[0-9]{3}"}
                                     placeholder={createdPlan?.macronutrients.fat.toString() || ""}
                                     label={'Fett(empfohlen: ' + createdPlan?.macronutrients.fat + 'g)'}/>

                    <OnboardingInput value={user.goal_protein || ""} onChange={(input) => {
                        setUser({...user, [input.name]: parseInt(input.value), goal_calories: calculateCalories()})
                        validateInput(input)
                    }
                    } name={'goal_protein'} pattern={"[0-9]{3}"}
                                     placeholder={createdPlan?.macronutrients.protein.toString() || ""}
                                     label={'Protein(empfohlen: ' + createdPlan?.macronutrients.protein + 'g)'}/>
                    <div className="flex flex-row">
                    <h2 className="text-lg pl-1 text-white text-start mb-4">Kalorienziel pro Tag (kcal): </h2>
                    <h2 id={"onboard-text-calorie-goal"} className="text-lg pl-1 text-white text-start mb-4">{user.goal_calories}</h2>
                    </div>
                </>
            )}
        </div>
    );
}

export default StepFive;
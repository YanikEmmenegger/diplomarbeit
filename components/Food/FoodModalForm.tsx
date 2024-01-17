'use client'
import {FC, useState} from "react";
import {FoodEntry, FoodModalItem} from "@/types/types.db";
import {twMerge} from "tailwind-merge";
import OnboardingInput from "@/components/Onboarding/OnboardingInput";
import Button from "@/components/Button";
import axios from "axios";
import useFoodModal from "@/hooks/useFoodModal";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

interface FoodModalFormProps {
    foodModalItem: FoodModalItem;
}

const FoodModalForm: FC<FoodModalFormProps> = ({foodModalItem}) => {

    const FoodModal = useFoodModal()

    const router = useRouter()


    const [foodEntryState, setFoodEntryState] = useState<FoodModalItem>(foodModalItem)

    const [saveButtonActive, setSaveButtonActive] = useState<boolean>(true)

    const changeMealType = (mealType: number) => {
        setFoodEntryState({...foodEntryState, meal_type: mealType})
    }
    const validateInput = (input: HTMLInputElement) => {
        if (input.name === "weight") {
            if (parseInt(input.value) < 31 || parseInt(input.value) > 799 || isNaN(parseInt(input.value))) {
                input.className = twMerge(input.className, "border-red-500")
                setSaveButtonActive(false)
            } else {
                input.className = twMerge(input.className, "border-CalorieCompass-Primary")
                setSaveButtonActive(true)
            }
        }
    }

    const saveDiaryEntry = async () => {

        const url = "/api/user/diary/" + foodEntryState.date

        const payload = {
            food: foodEntryState.food,
            serving_size: foodEntryState.serving_size,
            meal_type: foodEntryState.meal_type,
        }

        if (foodEntryState.id) {
            try {
                await toast.promise(axios.patch(url, {...payload, id: foodEntryState.id}).then(() => {
                    router.push("/app/diary/" + foodEntryState.date + "?refresh=" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
                    FoodModal.onClose()
                    }
                ), {
                    loading: 'Speichere...',
                    success: "Gespeichert!",
                    error: "Fehler beim speichern!",
                });
            } catch
                (error) {
                console.error('Error fetching user data:', error);
            }
        } else {
            try {
                await toast.promise(axios.post(url, payload).then(() => {
                        FoodModal.onClose()
                        router.refresh()
                    }
                ), {
                    loading: 'Speichere...',
                    success: "Gespeichert!",
                    error: "Fehler beim speichern!",
                });
            } catch
                (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }

    const deleteDiaryEntry = async () => {
        const url = "/api/user/diary/" + foodEntryState.date

        //await toast.promise(axios.delete("/api/user/weight", {data: weight}).then((newWeights) => {

        try {
            await toast.promise(axios.delete(url, {data: foodEntryState.id}).then(() => {
                    router.push("/app/diary/" + foodEntryState.date + "?refresh=" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
                    FoodModal.onClose()
                }
            ), {
                loading: 'lösche...',
                success: "gelöscht!",
                error: "Fehler beim löschen!",
            });
        } catch
            (error) {
            console.error('Error fetching user data:', error);
        }
    }
    return (
        <div className={"my-4"}>
            <div className="flex mt-2 flex-row w-auto gap-2 overflow-x-auto">
                <button
                    id={"foodmodal-form-breakfast"}
                    onClick={() => changeMealType(1)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-3 opacity-75  transition outline-none mb-3 border-2 bg-transparent border-CalorieCompass-Primary", foodEntryState.meal_type === 1 ? 'bg-CalorieCompass-Primary' : 'bg-transparent')}>
                    Frühstück
                </button>

                <button
                    id={"foodmodal-form-lunch"}
                    onClick={() => changeMealType(2)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-3 opacity-75 transition outline-none mb-3 border-2 bg-transparent border-CalorieCompass-Primary", foodEntryState.meal_type === 2 ? 'bg-CalorieCompass-Primary' : 'bg-transparent')}>
                    Mittagessen
                </button>
                <button
                    id={"foodmodal-form-dinner"}
                    onClick={() => changeMealType(3)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-3 opacity-75 transition outline-none mb-3 border-2 bg-transparent border-CalorieCompass-Primary", foodEntryState.meal_type === 3 ? 'bg-CalorieCompass-Primary' : 'bg-transparent')}>
                    Nachtessen
                </button>
                <button
                    id={"foodmodal-form-snack"}
                    onClick={() => changeMealType(4)}
                    className={twMerge("flex-1 mx-1 h-auto rounded-lg p-3 opacity-75 transition outline-none mb-3 border-2 bg-transparent border-CalorieCompass-Primary", foodEntryState.meal_type === 4 ? 'bg-CalorieCompass-Primary' : 'bg-transparent')}>
                    Snacks
                </button>
            </div>
            <div className="grid mt-5 grid-cols-7 mx-auto w-[95%] gap-5 items-center">
                <div className="col-span-4">
                    <OnboardingInput id={"foodmodal-form-servingsize"} value={foodEntryState.serving_size * 100} onChange={(input) => {
                        const value = parseInt(input.value) ? parseInt(input.value) / 100 : 0;
                        setFoodEntryState({...foodEntryState, [input.name]: value});
                        //validateInput(input);

                    }} name={"serving_size"} placeholder={"Menge in Gramm"}
                                     label={"Menge in (" + foodEntryState.food.unit + ")"}/>
                </div>
                <div className="col-span-3 mt-8">
                    <Button id={"foodmodal-form-save"} onClick={saveDiaryEntry} disabled={!saveButtonActive}
                            className={"w-full text-sm mb-2 p-4"}>{"speichern"}</Button>
                </div>
            </div>
            {foodEntryState.id &&
                <div className={" mt-24 w-1/2 mx-auto text-center"}>
                    <Button id={"foodmodal-form-delete"} onClick={deleteDiaryEntry}
                            className={"text-lg bg-red-700"}>löschen</Button>
                </div>
            }
        </div>
    )
}

export default FoodModalForm;
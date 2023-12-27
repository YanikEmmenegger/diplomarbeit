import {FC, useEffect, useState} from "react";
import OnboardingInput from "@/components/Onboarding/OnboardingInput";
import Button from "@/components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import {twMerge} from "tailwind-merge";
import {Weight} from "@/types/types.db";
import WeightItem from "@/components/Settings/WeightItem";
import {useRouter} from "next/navigation";

interface ChangeWeightProps {

}

const ChangeWeight: FC<ChangeWeightProps> = ({}) => {

    const router = useRouter();

    const [weights, setWeights] = useState<Weight[]>([]);
    const [oldWeight, setOldWeight] = useState<number | null>(null);
    const [saveButtonActive, setSaveButtonActive] = useState<boolean>(false);

    const [currentWeight, setCurrentWeight] = useState<number | string>("loading...");


    const fetchWeight = async () => {
        try {
            const response = await axios.get("/api/user/weight")
            setWeights(response.data);
            setCurrentWeight(response.data[0].weight)
            setOldWeight(response.data[0].weight);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }


    const validateInput = (input: HTMLInputElement) => {
        if (input.name === "weight") {
            if (parseInt(input.value) < 31 || parseInt(input.value) > 799 || isNaN(parseInt(input.value))) {
                input.className = twMerge(input.className, "border-red-500")
                setSaveButtonActive(false)
            } else {
                input.className = twMerge(input.className, "border-CalorieCompass-Primary")
                parseInt(input.value) !== oldWeight ? setSaveButtonActive(true) : setSaveButtonActive(false)
            }
        }
    }

    useEffect(() => {
        fetchWeight().finally();
        console.log(weights)
    }, []);


    const saveWeight = async () => {
        setSaveButtonActive(false)
        try {
            await toast.promise(axios.post("/api/user/weight", currentWeight).then((newWeights) => {
                setWeights(newWeights.data);
                setCurrentWeight(newWeights.data[0].weight)
                setOldWeight(newWeights.data[0].weight);
                router.refresh()
            }), {
                loading: 'Speichern...',
                success: "Gespeichert!",
                error: "Fehler beim speichern!",

            });
            //rerender whole page
        } catch (error) {
            console.error('Error fetching user data:', error);
        }

    }

    return (
        <>
            <h2 className={"text lg text-white mb-1 pt-2"}>Gewicht (kg)</h2>
            <div className="grid grid-cols-7 gap-5">
                <div className="col-span-4">
                    <OnboardingInput
                        hideLabel={true}
                        value={currentWeight ? currentWeight : ""}
                        onChange={(input) => {
                            setCurrentWeight(parseInt(input.value));
                            validateInput(input);
                        }}
                        name={"weight"}
                        placeholder={"Gewicht"}
                        pattern={"[0-9]{3}"}
                        label={"Gewicht (kg)"}
                    />
                </div>
                <div className="col-span-3">
                    <Button onClick={saveWeight} disabled={!saveButtonActive}
                            className={"w-full text-sm mb-2 p-4"}>{"speichern"}</Button>
                </div>
            </div>
            <div>
                {weights.length > 1 ?
                    <>
                        <h2 className={"text lg text-white mt-4 pt-2"}>Ältere Einträge: </h2>
                        <ul role="list" className="divide-y divide-gray-100">
                            {weights.map((weight, index) => {
                                if (index !== 0) {
                                    return (
                                        <WeightItem setWeights={setWeights} weight={weight} key={index}/>
                                    )
                                }
                            })}
                        </ul>
                    </> : <></>}
            </div>

        </>
    )
}
export default ChangeWeight;
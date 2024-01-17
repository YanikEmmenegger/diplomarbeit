import {FC, useEffect, useState} from "react";
import OnboardingInput from "@/components/Onboarding/OnboardingInput";
import Button from "@/components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import {twMerge} from "tailwind-merge";
import {useRouter} from "next/navigation";

interface ChangeHeightProps {

}

const ChangeHeight: FC<ChangeHeightProps> = ({}) => {

    const router = useRouter();

    const [height, setHeight] = useState<number | string>("loading...");
    const [oldHeight, setOldHeight] = useState<number | null>(null);
    const [saveButtonActive, setSaveButtonActive] = useState<boolean>(false);

    const fetchHeight = async () => {
        try {
            const response = await axios.get("/api/user/height")
            setHeight(response.data.height);
            setOldHeight(response.data.height);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const validateInput = (input: HTMLInputElement) => {
        if (input.name === "height") {
            if (parseInt(input.value) < 101 || parseInt(input.value) > 249 || isNaN(parseInt(input.value))) {
                input.className = twMerge(input.className, "border-red-500")
                setSaveButtonActive(false)
            } else {
                input.className = twMerge(input.className, "border-CalorieCompass-Primary")
                parseInt(input.value) !== oldHeight ? setSaveButtonActive(true) : setSaveButtonActive(false)
            }
        }
    }

    useEffect(() => {
        fetchHeight().finally();
    }, []);


    const saveHeight = async () => {
        setSaveButtonActive(false)
        try {
            await toast.promise(axios.post("/api/user/height", height).then((newHeight) => {
                setHeight(newHeight.data.height);
                setOldHeight(newHeight.data.height);
            }), {
                loading: 'Speichern...',
                success: "Grösse Gespeichert!",
                error: "Fehler beim speichern!",
            });
            router.refresh();
        } catch (error) {
            console.error('Error fetching user data:', error);
        }

    }

    return (
        <>
            <h2 className={"text lg text-white mb-1 pt-2"}>Grösse (cm)</h2>
            <div className="grid grid-cols-7 gap-5">
                <div className="col-span-4">
                    <OnboardingInput
                        hideLabel={true}
                        value={height ? height : ""}
                        onChange={(input) => {
                            setHeight(parseInt(input.value));
                            validateInput(input);
                        }}
                        name={"height"}
                        placeholder={"Grösse"}
                        pattern={"[0-9]{3}"}
                        label={"Grösse (cm)"}
                    />
                </div>
                <div className="col-span-3">
                    <Button id={"settings-btn-save-height"} onClick={saveHeight} disabled={!saveButtonActive} className={"w-full text-sm mb-2 p-4"}>{"speichern"}</Button>
                </div>
            </div>
        </>
    );
}

export default ChangeHeight;
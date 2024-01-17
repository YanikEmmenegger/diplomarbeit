'use client'
import {FC, useState} from "react";
import {Weight} from "@/types/types.db";
import Button from "@/components/Button";
import axios from "axios";
import toast from "react-hot-toast";
import {format} from "date-fns";
import {de} from "date-fns/locale";

interface WeightItemProps {
    weight: Weight;
    setWeights: React.Dispatch<React.SetStateAction<Weight[]>>;
}

const WeightItem: FC<WeightItemProps> = ({weight, setWeights}) => {
    const date = new Date(weight.created_at);

    const formattedDate = format(date, "dd.MM.yyyy", {locale: de});
    const [deleting, setDeleting] = useState<boolean>(false);

    const deleteWeight = async () => {
        setDeleting(true);
        console.log(weight)
        try {
            await toast.promise(axios.delete("/api/user/weight", {data: weight}).then((newWeights) => {
                    setWeights(newWeights.data);
                }
            ), {
                loading: 'Lösche...',
                success: "Gelöscht!",
                error: "Fehler beim löschen!",
            });

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }
    // RETURN JSX one row of the weight with date and a button to delete
    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex items-center">
                <div className="text-white text-sm">{weight.weight} kg |</div>
                <div className="text-white text-sm ml-2">{formattedDate}</div>
            </div>
            <div className="flex items-center">
                <Button onClick={deleteWeight} disabled={deleting}
                        className="settings-btn-delete-weight text-white text-sm ml-auto">{deleting ? "lösche..." : "löschen"}</Button>
            </div>
        </li>
    );
};

//how to formatt date from YYYY-MM-DD to DD.MM.YYYY
//

export default WeightItem;

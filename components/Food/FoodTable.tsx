import {FC} from "react";
import {Food} from "@/types/types.db";
import FoodItem from "@/components/Food/FoodItem";
interface FoodTableProps {
    foods: Food[]
}

const FoodTable: FC<FoodTableProps> = ({foods}) => {
    return (
        <div className={"container  px-2"}>
            <h1 className="mb-3">Results: {foods.length} | ✅ CalorieCompass Datensatz ❗externe Datenquelle, Nährwerte prüfen</h1>
            <ul role="list" className="divide-y divide-gray-100">
                {foods.map((food, index) => <FoodItem key={index} food={food}/>)}
            </ul>
        </div>
    )
}

export default FoodTable;


import {FC} from "react";
import {Food} from "@/types/types.db";
import FoodItem from "@/components/Food/FoodItem";

interface FoodTableProps {
    foods: Food[]
    date: string
    meal: number
}

const FoodTable: FC<FoodTableProps> = ({foods, meal, date}) => {
    return (
        <div className={"container px-2"}>
            {foods.length === 0 ?
                <h1 className="mb-3 text-xs md:text-base">Keine Ergebnisse gefunden | Bitte Suchbegriff
                    eingeben</h1> :
                <div>
                    <h1 className="mb-3 text-xs md:text-base">Results: {foods.length} | ✅ CalorieCompass
                        Datensatz❗externe Datenquelle, Nährwerte prüfen</h1>
                    <ul role="list" id={"food-ul-list"} className="divide-y divide-gray-100">
                        {foods.map((food, index) => <FoodItem id={index.toString()} meal={meal} date={date} key={index} food={food}/>)}
                    </ul>
                </div>}
        </div>
    )
}

export default FoodTable;


'use client'
import {FC, useEffect, useState} from "react";
import axios from "axios";
import {UserPlan} from "@/types/types.db";
import CircleChart from "@/components/CircleChart";

interface CalorieStatisticProps {

}

const CalorieStatistic: FC<CalorieStatisticProps> = ({}) => {
    const today = new Date().toISOString().slice(0, 10);

    const [diaryData, setDiaryData] = useState<any>(null);
    const [userPlan, setUserPlan] = useState<UserPlan | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserData = async () => {
        try {
            const axiosResponse = await axios.get('/api/user/diary/' + today);
            setDiaryData(axiosResponse.data);
        } catch (error) {
            console.error(error)
        }
        try {
            const axiosResponse = await axios.get('/api/user/plan');
            setUserPlan(axiosResponse.data);
        } catch (error) {
            console.error(error)
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const calculatePercentages = () => {
        if (diaryData && userPlan) {
            console.log(diaryData, userPlan)
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUserData().finally();

    }, []);

    useEffect(() => {
        calculatePercentages();
    }, [userPlan, diaryData]);


    return loading ? <div className={"grid grid-cols-1 opacity-50"}>
            <CircleChart strokeColor={"#ff9f0f"}
                         percentage={0}
                         current={0} heading={"Kalorien"} max={0}
                         unit={"kcal"} className={"w-36 mx-auto col-span-1"}/>
            <div className={"mx-auto mt-5 gap-9 col-span-1 flex flex-row"}>
                <CircleChart percentage={0}
                             current={0}
                             max={0}
                             heading={"Kohlenhydrate"}
                             unit={"g"} className={"w-24"}/>
                <CircleChart percentage={0}
                             current={0} heading={"Fett"} max={0}
                             unit={"g"}
                             className={"w-24"}/>
                <CircleChart percentage={0}
                             current={0} heading={"Protein"}
                             max={0}
                             unit={"g"}
                             className={"w-24"}/>
            </div>
            <h1 className={"text-white text-center mt-5 text-xl mb-2"}>Lade...</h1>
        </div> :

        <div className={"grid grid-cols-1"}>
            <CircleChart strokeColor={"#ff9f0f"}
                         percentage={Math.round(diaryData!.total.calories / userPlan!.goal_calories! * 100)}
                         current={Math.round(diaryData!.total.calories)} heading={"Kalorien"} max={userPlan!.goal_calories!}
                         unit={"kcal"} className={"w-36 mx-auto col-span-1"}/>
            <div className={"mx-auto mt-5 gap-9 col-span-1 flex flex-row"}>
                <CircleChart percentage={Math.round(diaryData!.total.carbohydrates / userPlan!.goal_carbs! * 100)}
                             current={Math.round(diaryData!.total.carbohydrates)} heading={"Carbs"}
                             max={userPlan!.goal_carbs!}
                             unit={"g"} className={"w-24"}/>
                <CircleChart percentage={Math.round(diaryData!.total.fat / userPlan!.goal_fat! * 100)}
                             current={Math.round(diaryData!.total.fat)} heading={"Fett"} max={userPlan!.goal_fat!}
                             unit={"g"}
                             className={"w-24"}/>
                <CircleChart percentage={Math.round(diaryData!.total.protein / userPlan!.goal_protein! * 100)}
                             current={Math.round(diaryData!.total.protein)} heading={"Protein"}
                             max={userPlan!.goal_protein!}
                             unit={"g"}
                             className={"w-24"}/>
            </div>
        </div>


}

export default CalorieStatistic;

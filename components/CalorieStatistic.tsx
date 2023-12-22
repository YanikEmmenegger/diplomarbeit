'use client'
import {FC, useEffect, useState} from "react";
import axios from "axios";
import {UserPlan} from "@/types/types.db";

interface CalorieStatisticProps {

}

const CalorieStatistic: FC<CalorieStatisticProps> = ({}) => {
    const today = new Date().toISOString().slice(0, 10);

    const [diaryData, setDiaryData] = useState(null);
    const [userPlan, setUserPlan] = useState<UserPlan| null>(null);

    const fetchDiary = async () => {
        try {
            const axiosResponse = await axios.get('/api/user/diary/' +today);
            setDiaryData(axiosResponse.data);
        } catch (error) {
            console.error(error)
        }
    };
    const fetchUserPlan = async () => {
        try {
            const axiosResponse = await axios.get('/api/user/plan');
            setUserPlan(axiosResponse.data);
        } catch (error) {
            console.error(error)
        }
    }

    const getCalorieSum = () => {

    }

    useEffect(() => {
        fetchUserPlan().finally();
        fetchDiary().finally();

    }, []);

    return (
        <div className='ENTER_COMPONENT_CLASS'></div>
    );
}

export default CalorieStatistic;
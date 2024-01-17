'use client'
import {FC, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

import axios from "axios";
import {Meal} from "@/types/types.db";
import MealComponent from "@/components/diary/MealComponent";
import DiaryNavigation from "@/components/diary/DiaryNavigation";


interface PageProps {
    params: {
        date: string;
    }
    searchParams: {
        productName: string;
    }
}

const foods = [''];
const Page: FC<PageProps> = ({params, searchParams}) => {
    const siteDate = new Date(params.date);
    const today = new Date().toISOString().slice(0, 10);
    const nextDay = new Date(siteDate.setDate(siteDate.getDate() + 1)).toISOString().slice(0, 10);
    const prevDay = new Date(siteDate.setDate(siteDate.getDate() - 2)).toISOString().slice(0, 10);
    const router = useRouter();

    const [breakfast, setBreakfast] = useState<Meal>({
        name: 'Frühstück',
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        entries: null
    });
    const [lunch, setLunch] = useState<Meal>({
        name: 'Mittagessen',
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        entries: null
    });
    const [dinner, setDinner] = useState<Meal>({
        name: 'Nachtessen',
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        entries: null
    });
    const [snacks, setSnacks] = useState<Meal>({
        name: 'Snacks',
        calories: 0,
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        entries: null
    });

    const fetchData = async () => {

        try {
            const axiosResponse = await axios.get('/api/user/diary/' + params.date);
            setDiary(axiosResponse.data);
            setBreakfast({...breakfast, ...axiosResponse.data.meals.breakfast});
            setLunch({...lunch, ...axiosResponse.data.meals.lunch});
            setDinner({...dinner, ...axiosResponse.data.meals.dinner});
            setSnacks({...snacks, ...axiosResponse.data.meals.snacks});
        } catch (error) {
            console.error(error)
        }
    };

    //save get parameter refresh into variable



    const [diary, setDiary] = useState();

    useEffect(() => {
        router.prefetch(`/app/diary/${nextDay}`);
        router.prefetch(`/app/diary/${prevDay}`);
        const timeout = setTimeout(() => {
            fetchData().then();

            router.prefetch(`/app/`)
        }, 500);
        return () => clearTimeout(timeout);


    }, [params.date, searchParams]);


    const goPrevDay = () => {
        router.replace(`/app/diary/${prevDay}`)
    }
    const goNextDay = () => {
        router.replace(`/app/diary/${nextDay}`)
    }

    return (
        <>
            <DiaryNavigation onNext={goNextDay} onPrev={goPrevDay} date={params.date}/>
            <div className={"grid gap-6 mt-5 grid-cols-1 w-full md:w-4/5 mx-auto md:grid-cols-2 2xl:grid-cols-4"}>
                <MealComponent meal_type={1} date={params.date} meal={breakfast}/>
                <MealComponent  meal_type={2} date={params.date} meal={lunch}/>
                <MealComponent meal_type={3} date={params.date} meal={dinner}/>
                <MealComponent meal_type={4} date={params.date} meal={snacks}/>
            </div>
        </>
    )

}

export default Page;
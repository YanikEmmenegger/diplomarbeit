'use client'
import {FC} from "react";
import {useRouter} from "next/navigation";
import {format} from "date-fns";
import {de} from "date-fns/locale";

interface PageProps {
    params: {
        date: string;
    }
}

const foods = [''];
const Page: FC<PageProps> = ({params}) => {
    const siteDate = new Date(params.date);
    const today = new Date().toISOString().slice(0, 10);
    const nextDay = new Date(siteDate.setDate(siteDate.getDate() + 1)).toISOString().slice(0, 10);
    const prevDay = new Date(siteDate.setDate(siteDate.getDate() - 2)).toISOString().slice(0, 10);
    const router = useRouter();
    const rightSwipe = () => {
        router.replace(`/app/diary/${prevDay}`)
    }
    const leftSwipe = () => {
        router.replace(`/app/diary/${nextDay}`)
    }

    return (
        <>
            <h1 className="">{getDisplayNameofDate(params.date, today)}</h1>
            <button onClick={rightSwipe}>Zurück</button>
            <button onClick={leftSwipe}>Nächster tag</button>
        </>
    )

}

const getDisplayNameofDate = (siteDate: string, todayDate: string): string => {

    //Add logic to display "Yesterday" if siteDate is yesterday
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().slice(0, 10);
    if (siteDate === yesterday) return "Gestern";
    //logic to display "Today" if siteDate is today
    if (siteDate === todayDate) return "Heute";
    //logic to display "Tomorrow" if siteDate is tomorrow
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10);
    if (siteDate === tomorrow) return "Morgen";
    //Logic to display the date if none of the above
    const date = new Date(siteDate);

    return format(date, "EE, dd MMM", {locale: de});
}

export default Page;
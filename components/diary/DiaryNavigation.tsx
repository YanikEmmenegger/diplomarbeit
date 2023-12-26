import {FC} from "react";
import {format} from "date-fns";
import {de} from "date-fns/locale";
import Button from "@/components/Button";
import {ArrowLeft, ArrowRight} from "lucide-react";

interface DiaryNavigationProps {
    onNext: () => void;
    onPrev: () => void;
    date: string;
}

const DiaryNavigation: FC<DiaryNavigationProps> = ({date, onPrev, onNext}) => {

    const today = new Date().toISOString().slice(0, 10);


    return (
        <div className={"w-full md:w-4/5 mx-auto flex flex-row gap-9 justify-between"}>
            <Button onClick={onPrev}><ArrowLeft/></Button>
            <h1 className="text-center mt-1 text-lg">{getDisplayNameofDate(date, today)}</h1>
            <Button onClick={onNext}><ArrowRight/></Button>
        </div>
    );
}

export default DiaryNavigation;

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

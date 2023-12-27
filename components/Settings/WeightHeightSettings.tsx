'use client'
import {FC} from "react";
import WeightStatistic from "@/components/WeightStatistic";
import ChangeHeight from "@/components/Settings/ChangeHeight";
import ChangeWeight from "@/components/Settings/ChangeWeight";


interface WeightHeightSettingsProps {

}

const WeightHeightSettings: FC<WeightHeightSettingsProps> = ({}) => {


    return (
        <>
            <h1 className="text-xl text-white text-center mb-2">Gewicht & Grösse</h1>
            <ChangeHeight/>
            <ChangeWeight/>
            <WeightStatistic/>
        </>
    );
}

export default WeightHeightSettings;
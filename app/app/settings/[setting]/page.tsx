'use client'
import {FC, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {format} from "date-fns";
import {de} from "date-fns/locale";
import axios from "axios";
import StepOne from "@/components/Onboarding/StepOne";
import PersonalSettings from "@/components/Settings/PersonalSettings";


interface PageProps {
    params: {
        setting: string;
    }
}

const foods = [''];
const Page: FC<PageProps> = ({params}) => {


    const getSetting= ()=>{
        switch (params.setting) {
            case "personal":
                return <PersonalSettings/>
            case "plan":
                return <div className="text-center">Plan</div>
            case "height-weight":
                return <div className="text-center">Grösse und Gewicht</div>
            default:
                return <div className="text-center">404</div>
        }
    }

    return (
        <div className="w-4/5 md:w-1/2 mx-auto">
                {getSetting()}
        </div>)
}
export default Page;
'use client'
import {FC, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {format} from "date-fns";
import {de} from "date-fns/locale";
import axios from "axios";
import StepOne from "@/components/Onboarding/StepOne";
import PersonalSettings from "@/components/Settings/PersonalSettings";
import Link from "next/link";
import Button from "@/components/Button";
import PlanSettings from "@/components/Settings/PlanSettings";


interface PageProps {
    params: {
        setting: string;
    }
}

const foods = [''];
const Page: FC<PageProps> = ({params}) => {


    const router = useRouter();


    const getSetting = () => {
        switch (params.setting) {
            case "personal":
                return <PersonalSettings/>
            case "plan":
                return <PlanSettings/>
            case "height-weight":
                return <div className="text-center">Grösse und Gewicht</div>
            default:
                return <div className="text-center">404</div>
        }
    }

    return (
        <>
            <div className=" w-4/5 md:w-1/2 mx-auto">
                <Button className={"text-md"} onClick={router.back}>
                    Zurück
                </Button>
                {getSetting()}
            </div>
        </>
    )
}
export default Page;
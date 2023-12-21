import React, {FC, useMemo} from "react";
import SignOutButton from "@/components/SignOutButton";
import Onboarding from "@/components/Onboarding/Onboarding";
import Button from "@/components/Button";
import SettingsButton from "@/components/Settings/SettingsButton";

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {


    const settingOptions = useMemo(() => {
        return [
            {
                link: "/app/settings/personal",
                text: "Persönliche Daten"
            },
            {
                link: "/app/settings/plan",
                text: "Plan"
            },
            {
                link: "/app/settings/height-weight",
                text: "Grösse und Gewicht"
            },
            {
                link: "/api/auth/signout",
                text: "Logout"
            },
        ]

    }, []);

    return (
        <div className="text-center flex-row mx-auto w-4/5 md:w-1/2">
            {
                settingOptions.map((settingOption, index) => {
                    return (
                        <div className="mb-4" key={index}>
                            <SettingsButton link={settingOption.link} text={settingOption.text}/>
                        </div>
                    )
                }
                )
            }
        </div>
    );
}

export default Page;
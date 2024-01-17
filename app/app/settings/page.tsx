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
                text: "Persönliche Daten",
                id: "personal"
            },
            {
                link: "/app/settings/plan",
                text: "Plan",
                id: "plan"
            },
            {
                link: "/app/settings/weight-height",
                text: " Grösse & Gewicht anpassen",
                id: "weight_height"
            },
            {
                link: "/app/onboard",
                text: "Onboarding neu starten",
                id: "onboard"
            },
            {
                link: "/api/auth/signout",
                text: "Logout",
                id: "logout"
            },
        ]

    }, []);

    return (
        <div className="text-center flex-row mx-auto w-4/5 md:w-1/2">
            {
                settingOptions.map((settingOption, index) => {
                    return (
                        <div className="mb-4" key={index}>
                            <SettingsButton id={"settings-btn-"+settingOption.id} link={settingOption.link} text={settingOption.text}/>
                        </div>
                    )
                }
                )
            }
        </div>
    );
}

export default Page;
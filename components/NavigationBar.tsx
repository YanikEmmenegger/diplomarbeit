'use client'
import {FC, useMemo} from "react";
import NavButton from "@/components/NavButton";
import {usePathname} from "next/navigation";

import { CiCalendar, CiGrid42, CiSettings} from "react-icons/ci";
import CirclePlusButton from "@/components/CirclePlusButton";

interface NavigationBarProps {

}


const NavigationBar: FC<NavigationBarProps> = ({}) => {
    const pathname = usePathname();
    const today = new Date().toISOString().slice(0, 10);
    const routes = useMemo(() => [
        {
            icon: CiGrid42,
            label: 'Dashbaord',
            active: pathname === '/app',
            href: '/'
        },
        {
            icon: CiCalendar,
            label: 'Diary',
            active: pathname === '/app/diary',
            href: '/diary/' + today
        },
        {
            icon: CiSettings,
            label: 'Settings',
            active: pathname === '/app/settings',
            href: '/settings'
        }

    ], [pathname, today])

    return (
        pathname !== '/app/onboard' ?
            <div className="fixed bottom-0 left-0 w-full  justify-center flex flex-col">
                <CirclePlusButton active={pathname === '/app'}></CirclePlusButton>
                <div
                    className="relative bottom-0 flex-col items-center -left-[25%] w-[150%] bg-CalorieCompass-Primary pt-3 text-white rounded-t-[100%]">
                    <div className="grid grid-cols-3 items-center w-2/3 md:w-3/4 lg:w-1/3 mx-auto pb-3 ">
                        {
                            routes.map(({icon: Icon, label, active, href}) => {
                                return (
                                    <NavButton
                                        id={`btn-${label.toLowerCase()}`}
                                        key={label}
                                        icon={Icon}
                                        label={label}
                                        active={active}
                                        link={href}
                                    />
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            :
            <></>
    )

}

export default NavigationBar;
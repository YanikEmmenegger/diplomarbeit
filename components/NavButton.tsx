import {FC} from "react";
import {IconType} from "react-icons";
import Link from "next/link";
import {twMerge} from "tailwind-merge";

interface NavButtonProps {
    id?: string;
    icon: IconType;
    link: string;
    label: string;
    active?: boolean;
}

const NavButton: FC<NavButtonProps> = ({id, link, icon: Icon, label, active}) => {
    return (
        <div id={id+"-container"} className="hover:font-bold py-4 transition cursor-pointer flex flex-col items-center justify-center w-full nav-button">
            <Link id={id} className="flex flex-col items-center justify-center" href={`/app/${link}`}>
                <Icon fontSize="30px"/>
                <p className={twMerge(active ? "font-bold" : "font-semibold", "text-xs transition-all") }>{label}</p>
            </Link>

        </div>
    );
};

export default NavButton;

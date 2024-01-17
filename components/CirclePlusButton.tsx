import {FC} from "react";
import {CiCirclePlus} from "react-icons/ci";
import {twMerge} from "tailwind-merge";
import Link from "next/link";

interface CircleButtonProps {
    active?: boolean
}

const CirclePlusButton: FC<CircleButtonProps> = ({active}) => {
    return (

        <div className={twMerge(" mb-4 mx-auto hover:scale-105 outline-none cursor-pointer w- p-2 bg-CalorieCompass-Primary rounded-full transition", active ? "opacity-100 scale-100" : "opacity-0 scale-0")}>
            <Link id={"nav-btn-add"} href={"app/food"}>
                <CiCirclePlus fontSize="45px" color="white"></CiCirclePlus>
            </Link>
        </div>

    );
}

export default CirclePlusButton;
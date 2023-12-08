'use client'
import {FC} from "react";
import {twMerge} from "tailwind-merge";

interface LinkButtonProps {
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    id?: string;

}

const LinkButton: FC<LinkButtonProps> = ({onClick, className, children,id}) => {
    return (
        <button onClick={onClick}
                id={id}
                className={twMerge("bg-CalorieCompass-Primary hover:opacity-95 hover:transition text-white text-2xl font-light py-2 px-4 rounded-lg", className)}>
            {children}
        </button>
    );
}

export default LinkButton;
'use client'
import {FC} from "react";
import {twMerge} from "tailwind-merge";

interface LinkButtonProps {
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    id?: string;
    disabled?: boolean;

}

const Button: FC<LinkButtonProps> = ({onClick, className, children,id, disabled}) => {
    return (
        <button disabled={disabled} onClick={onClick}
                id={id}
                className={twMerge("bg-CalorieCompass-Primary hover:transition text-white text-2xl font-light py-2 px-4 rounded-lg", className, disabled? "cursor-not-allowed opacity-20": "cursor-pointer hover:opacity-90 opacity-100")}>
            {children}
        </button>
    );
}

export default Button;
import {FC} from "react";
import Link from "next/link";
import Button from "@/components/Button";
import {twMerge} from "tailwind-merge";

interface SettingSaveButtonProps {
    active: boolean;
    onClick: () => void;
}

const SettingSaveButton: FC<SettingSaveButtonProps> = ({onClick, active}) => {
    return (
        <Button onClick={onClick} className={twMerge("w-full mt-2", active? "cursor-pointer": "cursor-not-allowed")}>
            Save
        </Button>
    );
}

export default SettingSaveButton;
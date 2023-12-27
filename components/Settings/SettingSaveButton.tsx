import {FC} from "react";
import Link from "next/link";
import Button from "@/components/Button";
import {twMerge} from "tailwind-merge";

interface SettingSaveButtonProps {
    active: boolean;
    onClick: () => void;
    text: string;
}

const SettingSaveButton: FC<SettingSaveButtonProps> = ({onClick, active ,text}) => {
    return (
        <Button disabled={!active} onClick={onClick} className={"w-full mt-2"}>
            {text}
        </Button>
    );
}

export default SettingSaveButton;
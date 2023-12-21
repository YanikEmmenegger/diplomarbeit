import {FC} from "react";
import Button from "@/components/Button";
import Link from "next/link";

interface SettingsButtonProps {
    link: string;
    text: string;

}

const SettingsButton: FC<SettingsButtonProps> = ({link, text}) => {
    return (
        <Button className={"w-full"}>
            <Link href={link}>{text}</Link>
        </Button>
    );
}

export default SettingsButton;
import {FC} from "react";
import Button from "@/components/Button";
import Link from "next/link";

interface SettingsButtonProps {
    link: string;
    text: string;
    id: string

}

const SettingsButton: FC<SettingsButtonProps> = ({link, text, id}) => {
    return (
        <Link id={id} href={link}>
            <Button className={"w-full"}>
                {text}
            </Button>
        </Link>
    );
}

export default SettingsButton;
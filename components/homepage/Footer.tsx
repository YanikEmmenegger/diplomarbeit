import {FC} from "react";
import Link from "next/link";
interface FooterProps {

}

const Footer: FC<FooterProps> = ({}) => {
    return (
        <div className="flex flex-row justify-center items-center text-white p-2 pb-10">
            <Link className="outline-none hover:opacity-90 transition-opacity p-1 underline" href={"/contact"}>Impressum</Link>
            <Link className="outline-none hover:opacity-90 transition-opacity p-1 underline" href={"/legals"}>Datenschutz & AGBs</Link>
        </div>
    );
}

export default Footer;
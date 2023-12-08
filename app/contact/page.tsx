import {FC} from "react";
import Link from "next/link";

import {AiFillCloseCircle} from "react-icons/ai";

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {
    return (
        <div
            className="flex mx-auto flex-col items-center min-h-screen py-10 w-[85%] md:w-1/2">
            <Link href={"/"} className="group hover:scale-105 transition-transform">
                <AiFillCloseCircle font-size={40}/>
            </Link>
            <h1 className="my-5 text-2xl md:text-5xl">Kontakt</h1>
            <div className="flex flex-col items-start justify-start pb-20  w-full">
                <h2 className="text-xl  pb-2 text-gray-400">Email</h2>
                <p className="text-sm">
                    <a className="underline hover:opacity-90 transition-opacity" href="mailto:yanik1999@hotmail.com">yanik1999@hotmail.com</a>
                </p>
            </div>
        </div>
    );
}

export default Page;
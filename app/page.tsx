'use client'
import {FC} from "react";
import Image from "next/image";
import Features from "@/components/homepage/Features";
import LinkButton from "@/components/LinkButton";
import Link from "next/link";
import {FiExternalLink} from "react-icons/fi";
import Footer from "@/components/homepage/Footer";

interface PageProps {
}

const Page: FC<PageProps> = ({}) => {
    return (
        <div className="flex flex-col items-center min-h-screen py-2">
            <h1 className="px-10 my-5 text-6xl md:text-9xl border-b-2 text-fitfork-primary">Welcome</h1>
            <Image className="mb-10 md:w-[100px] w-[100px] " width={150} height={150} src={"/images/logo_white.png"}
                   alt={"logo"}/>
            <LinkButton id={"open-app"} className={"link-button"}>
                <Link className="font-light float-left pr-1" href={"/app"}>Open App</Link>
                <FiExternalLink color={"white"}/>
            </LinkButton>
            <Features/>
            <Footer></Footer>
        </div>
    );
}

export default Page;
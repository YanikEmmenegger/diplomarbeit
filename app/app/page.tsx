import {FC} from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabase";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Session} from "inspector";

interface PageProps {

}


const Page: FC<PageProps> = async ({}) => {




    return (
        <div className="mt-[20%] text-center text-amber-500 font-bold text-5xl">Protected Area - Dashboard, </div>
    );
}

export default Page;
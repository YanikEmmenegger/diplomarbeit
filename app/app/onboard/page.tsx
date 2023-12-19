import { FC} from "react";
import { createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabaseDatabaseTypes";
import {cookies} from "next/headers";
import Onboarding from "@/components/Onboarding/Onboarding";

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
    const supabase = createServerComponentClient<Database>({cookies})
    const {
        data: {session},
    } = await supabase.auth.getSession()

    const {error, data: user} =  await supabase.from('users').select('*').eq('id', session!.user?.id).single()
    if (error) console.log(error)

    return (
        <div className=" mx-auto w-4/5 md:w-1/2 ">
            <Onboarding User={user!}></Onboarding>
        </div>
    );
};

export default Page;

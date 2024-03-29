import AuthForm from "@/components/AuthForm";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabaseDatabaseTypes";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
const Page = async () => {

    const supabase = createServerComponentClient<Database>({cookies})
    const {
        data: {session},
    } = await supabase.auth.getSession()

    if (session) {
        redirect("/app")
    }
    return (
        <AuthForm/>
    );
}

export default Page;
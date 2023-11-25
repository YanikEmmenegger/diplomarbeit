import {createClientComponentClient, createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabaseDatabaseTypes";
import {cookies} from "next/headers";

const serverComponent  = async ()=>{
    const supabase = createServerComponentClient<Database>({cookies})
    const {
        data: {session},
    } = await supabase.auth.getSession()

    return {
        supabase,
        session
    }
}
const clientComponent  = async ()=>{
    const supabase = createClientComponentClient<Database>()
    const {
        data: {session},
    } = await supabase.auth.getSession()

    return {
        supabase,
        session
    }
}

export {serverComponent, clientComponent}
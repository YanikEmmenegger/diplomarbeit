import {FC} from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabaseDatabaseTypes";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

interface AuthProviderProps {
    children: React.ReactNode;
}
const AuthProvider: FC<AuthProviderProps> = async ({children}) => {
    //create a server-side supabase client
    const supabase = createServerComponentClient<Database>({cookies})
    //try to get the session
    const {
        data: {session},
    } = await supabase.auth.getSession()
    //if there is no session, user is not logged in, redirect to login page
    if (!session) {
        redirect("/login")
    }
    //if there is a session, render the children
    return (
        <>{children}</>
    );
}
export default AuthProvider;
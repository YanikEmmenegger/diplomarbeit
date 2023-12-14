import {FC} from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabaseDatabaseTypes";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = async ({children}) => {

    const supabase = createServerComponentClient<Database>({cookies})
    const {
        data: {session},
    } = await supabase.auth.getSession()

    if (!session) {
        redirect("/login")
    }
    return (
        <>
            {children}
        </>
    );
}

export default AuthProvider;
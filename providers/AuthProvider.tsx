import {FC} from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {Database} from "@/types/supabase";
import {cookies} from "next/headers";
import {NextResponse} from "next/server";
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
        <div>
            {children}
        </div>
    );
}

export default AuthProvider;
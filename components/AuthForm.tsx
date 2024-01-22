'use client'
import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {Database} from "@/types/supabaseDatabaseTypes";
import {useRouter} from "next/navigation";

export default function AuthForm() {
    const router = useRouter()
    //Workaround for email/password login
    const supabase = createClientComponentClient<Database>()
    const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
            if (session) {
                router.push('/api/auth/callback');
            }
        }
    )
    const getURL = () => {
        //check on which environment we are and set the correct callback-url
        let url = process?.env?.NEXT_PUBLIC_VERCEL_ENV === 'production' ?
            "https://caloriecompass.ch/" :
            process?.env?.NEXT_PUBLIC_VERCEL_URL!// Automatically set by Vercel. (http://localhost:3000 in .env.local)
        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`
        // Make sure to include a trailing `/`.
        url = url.charAt(url.length - 1) === '/api/auth/callback' ? url : `${url}/api/auth/callback`
        return url
    }
    return (
        <div id={"cc-auth-form"} className=" pt-12 mx-auto lg:w-1/2 w-[90%]">
            <h1 className={"text-center text-3xl"}>Login | SignUp</h1>
            <Auth socialLayout={"vertical"} magicLink providers={["github", "google"]}
                  redirectTo={getURL()}
                  //email & Passwort login is only available in development for testing purposes
                  onlyThirdPartyProviders={process?.env?.NEXT_PUBLIC_VERCEL_ENV === 'production'}
                  theme="dark" supabaseClient={supabase} appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        // @ts-ignore
                        brand: '#1c1c1c',
                        brandAccent: "#3ecb00"
                    }
                },
            }}/>
        </div>
    )
}
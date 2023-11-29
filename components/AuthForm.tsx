'use client'
import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {Database} from "@/types/supabaseDatabaseTypes";

export default function AuthForm() {
    const supabase = createClientComponentClient<Database>()
    const getURL = () => {
        let url = process?.env?.NEXT_PUBLIC_VERCEL_ENV === 'production' ?
            "https://caloriecompas.ch/api/auth/callback" :
            process?.env?.NEXT_PUBLIC_VERCEL_URL!// Automatically set by Vercel.
        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`
        // Make sure to include a trailing `/`.
        url = url.charAt(url.length - 1) === '/api/auth/callback' ? url : `${url}/api/auth/callback`
        return url
    }
    return (
        <div id={"cc-auth-form"} className=" pt-12 mx-auto lg:w-1/2 w-[90%]">
            <h1 className={"text-center text-3xl"}>{process?.env?.NEXT_PUBLIC_VERCEL_ENV} Login | SignUp {getURL()}</h1>
            <Auth socialLayout={"vertical"} magicLink providers={["linkedin", "github", "apple", "google"]}
                  redirectTo={getURL()}
                  onlyThirdPartyProviders
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
'use client'
import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {Database} from "@/types/supabase";

export default function AuthForm() {
    const supabase = createClientComponentClient<Database>()
    const getURL = () => {
        let url =
            process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
            process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
            'http://localhost:3000/'
        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`
        // Make sure to include a trailing `/`.
        url = url.charAt(url.length - 1) === '/api/auth/callback' ? url : `${url}/api/auth/callback`
        return url
    }

    return (
        <div className="pt-8 mx-auto lg:w-1/2 w-[90%]">
            <Auth socialLayout={"vertical"} magicLink providers={["linkedin", "github", "apple", "google"]}
                  redirectTo={getURL()}
                  onlyThirdPartyProviders={true}
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
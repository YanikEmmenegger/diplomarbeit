'use client'
import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {Database} from "@/types/supabase";

export default function AuthForm() {
    const supabase = createClientComponentClient<Database>()

    return (
        <div className="pt-8 mx-auto lg:w-1/2 w-[90%]">
            <Auth socialLayout={"vertical"} magicLink providers={["linkedin", "github", "apple", "google"]}
                  redirectTo="http://localhost:3000/api/auth/callback"
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
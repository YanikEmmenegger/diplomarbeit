import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')

    if (code) {
        await supabase.auth.exchangeCodeForSession(code)
    }
    const {
        data: {session},
    } = await supabase.auth.getSession()
    const {error, data} =  await supabase.from('users').select('*').eq('id', session!.user?.id).single()
    if (error) {
        console.log(error)
    }else{
        console.log(data)
        if (!data.onboarding_complete) {
           return NextResponse.redirect(new URL('/app/onboarding', req.url))
        }
    }
    return NextResponse.redirect(new URL('/app', req.url))
}
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    console.log(req.nextUrl.pathname)

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // if user is signed in and the current path is / redirect the user to /account
    /*if (user && req.nextUrl.pathname === '/') {
        //return NextResponse.redirect(new URL('/app', req.url))
    }

    // if user is not signed in and the current path includes /app redirect the user to /login
    if (!user && req.nextUrl.pathname.includes('/app')) {
        return NextResponse.redirect(new URL('/login', req.url))
    }*/

    return res
}

export const config = {
    matcher: ['/', '/account'],
}
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";
import {User} from "@/types/types.db";

export async function GET(req: NextRequest) {

    //create supabase client
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})
    //check if user is logged in
    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        //if not logged in return 401
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {
        //if logged in return user data
        const {data, error} = await supabase
            .from('users')
            .select()
            .eq('id', session.user.id).single()
        if (error) {
            //return error if error
            return NextResponse.json("Error", {status: 500})//return NextResponse.json({message: 'Work in Progress :D'})
        } else {
            //return user data
            return NextResponse.json(data, {status: 200})//return NextResponse.json({message: 'Work in Progress :D'})
        }
    }
}

export async function PATCH(req: NextRequest) {
    //create supabase client
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})
    //check if user is logged in
    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        //if not logged in return 401
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {
        //if logged in return user data
        try {
            const user: User = await req.json()
            const { data, error } = await supabase
                .from('users')
                .update(user)
                .eq('id', session.user.id)
                .select()
                .single();
            if (error) {
                //return error if error
                return NextResponse.json(error, {status: 500})//return NextResponse.json({message: 'Work in Progress :D'})
            } else {
                //return user data
                return NextResponse.json(data, {status: 200})//return NextResponse.json({message: 'Work in Progress :D'})
            }
        } catch (e) {
            // Return error if error
            return NextResponse.json(e, {status: 500});
        }
    }
}
import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'
import {UserDetails} from "@/types/types.db";

export async function PATCH(req: NextRequest) {
    //create supabase client
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})
    //check if user is logged in
    const {
        data: {session},
    } = await supabase.auth.getSession()
    //if not logged in return 401
    if (!session) {
        return NextResponse.json("Unauthorized", {status: 401})
    } else {
        //if logged in update user data
        //get new user data from request body
        try {
            const userDetails: UserDetails = await req.json()

            // Dynamically construct the update object based on non-undefined properties
            const updateObject: Partial<UserDetails> = {};
            if (userDetails.name !== undefined) updateObject.name = userDetails.name;
            if (userDetails.firstname !== undefined) updateObject.firstname = userDetails.firstname;
            if (userDetails.gender !== undefined) updateObject.gender = userDetails.gender;
            if (userDetails.email !== undefined) updateObject.email = userDetails.email;
            if (userDetails.birthdate !== undefined) updateObject.birthdate = userDetails.birthdate;

            // Update user data and return updated user data
            const { data, error } = await supabase
                .from('users')
                .update(updateObject)
                .eq('id', session.user.id)
                .select('name, firstname, gender, email, birthdate')
                .single();

            if (error) {
                // Return error if error
                return NextResponse.json(error, { status: 500 });
            } else {
                // Return updated user data
                return NextResponse.json(data, { status: 200 });
            }
        } catch (e) {
            // Return error if error
            return NextResponse.json(e, { status: 500 });
        }
    }
}

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
            .select('name, firstname, gender, email, birthdate')
            .eq('id', session.user.id)
            .single()
        if (error) {
            //return error if error
            return NextResponse.json("Error", {status: 500})//return NextResponse.json({message: 'Work in Progress :D'})
        } else {
            //return user data
            return NextResponse.json(data, {status: 200})//return NextResponse.json({message: 'Work in Progress :D'})
        }
    }
}
import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'

export async function POST(req: NextRequest) {
    // create a supabase client
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
        try {
            //get height from request body
            const height: number = await req.json()
            //try to insert new height
            const {data, error} = await supabase
                .from('heights')
                .insert(
                    {
                        user_id: session.user.id,
                        created_at: getCurrentDate(),
                        height: height
                    }
                ).select()
            //if already exists for this day Update
            if (error?.code === '23505') {
                //update if already exists
                const {data, error} = await supabase
                    .from('heights')
                    .update({height: height})
                    .eq('user_id', session.user.id)
                    .eq('created_at', getCurrentDate())
                    .select()
                    .single()
                if (error) {
                    return NextResponse.json(error, {status: 500})//return NextResponse.json({message: 'Work in Progress :D'})
                } else {
                    return NextResponse.json(data, {status: 200})//return NextResponse.json({message: 'Work in Progress :D'})
                }
            }
            if (error) {
                // console.log(error)
                return NextResponse.json(error, {status: 500})//return NextResponse.json({message: 'Work in Progress :D'})
            } else {
                return NextResponse.json(data, {status: 200})//return NextResponse.json({message: 'Work in Progress :D'})
            }
        } catch (e) {
            return NextResponse.json(e, {status: 500})//return NextResponse.json({message: 'Work in Progress :D'})
        }


    }
}

export async function GET(req: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {

        const {data, error} = await supabase
            .from('heights')
            .select('height, created_at')
            .eq('user_id', session.user.id)
            .order('created_at', {ascending: false})
            .limit(1)
        if (error) {
            return NextResponse.json(error, {status: 500})
        } else {
            return NextResponse.json(data[0], {status: 200})
        }
    }
}

function getCurrentDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}


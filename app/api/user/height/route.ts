import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'

export async function POST(req: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {
        //Todo Error Handling no body
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
                .eq('created_at',getCurrentDate())
                .select()
            if (error) {
                return NextResponse.json(error, {status: 500})//return NextResponse.json({message: 'Work in Progress :D'})
            }else {
                return NextResponse.json(data, {status: 200})//return NextResponse.json({message: 'Work in Progress :D'})
            }
        }
        if (error) {
            // console.log(error)
            return NextResponse.json(error, {status: 500})//return NextResponse.json({message: 'Work in Progress :D'})
        } else {
            return NextResponse.json(data, {status: 200})//return NextResponse.json({message: 'Work in Progress :D'})
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


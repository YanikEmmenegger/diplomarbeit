import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'
import {Weight} from "@/types/types.db";

export async function POST(req: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {
        try {
            const weight: number = await req.json()
            //try to insert new weight
            const {data, error} = await supabase
                .from('weights')
                .insert(
                    {
                        user_id: session.user.id,
                        created_at: getCurrentDate(),
                        weight: weight
                    }
                ).select()
            //if already exists for this day Update
            if (error?.code === '23505') {
                //update if already exists
                const {data, error} = await supabase
                    .from('weights')
                    .update({weight: weight})
                    .eq('user_id', session.user.id)
                    .eq('created_at', getCurrentDate())
                    .select()
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
            //return error if error
            return NextResponse.json(e, {status: 500})
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
            .from('weights')
            .select('weight, created_at')
            .eq('user_id', session.user.id)
            .order('created_at', {ascending: false})

        if (error) {
            return NextResponse.json(error, {status: 500})
        } else {
            return NextResponse.json(data, {status: 200})
        }
    }
}


export async function DELETE(req: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {
        try {
            const weight: Weight = await req.json()

            const {error} = await supabase
                .from('weights')
                .delete()
                .eq('user_id', session.user.id)
                .eq('created_at', weight.created_at)
                .eq('weight', weight.weight)
            if (error) {
                console.log(error)
                return NextResponse.json(error, {status: 500})//return NextResponse.json({message: 'Work in Progress :D'})
            } else {

                const {data, error} = await supabase
                    .from('weights')
                    .select('weight, created_at')
                    .eq('user_id', session.user.id)
                    .order('created_at', {ascending: false})

                if (error) {
                    return NextResponse.json(error, {status: 500})
                }
                else {
                    return NextResponse.json(data, {status: 200})
                }
            }
        }
        catch (e) {
            //return error if error
            return NextResponse.json(e, {status: 500})
        }
    }
}

/*export async function DELETE(req: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {
        const weight: Weight = await req.json()

        console.log(weight)
        try {

            const weight: Weight = await req.json()

            console.log(weight)

            const {data, error} = await supabase
                .from('weights')
                .delete()
                .eq('user_id', session.user.id)
                .eq('created_at', weight.created_at)
                .eq('weight', weight.weight)
                .select()
            if (error) {
                return NextResponse.json(error, {status: 500})//return NextResponse.json({message: 'Work in Progress :D'})
            } else {
                return NextResponse.json(data, {status: 200})//return NextResponse.json({message: 'Work in Progress :D'})
            }
        } catch (e) {
            //return error if error
            return NextResponse.json(e, {status: 500})
        }
    }
}*/

function getCurrentDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}
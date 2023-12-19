import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'
import {User} from "@/types/types.db";

export async function PATCH(req: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {
        //Todo Error Handling no body
        const newUserData: User = await req.json()
        console.log(newUserData)

        if (session.user.id !== newUserData.id) {
            return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
        }

        const {data, error} = await supabase
            .from('users')
            .update({
               goal_calories: newUserData.goal_calories,
                goal_carbs: newUserData.goal_carbs,
                goal_fat: newUserData.goal_fat,
                goal_protein: newUserData.goal_protein,
            })
            .eq('id', session.user.id)
            .select()

        if (error) {
            return NextResponse.json("Error", {status: 500})//return NextResponse.json({message: 'Work in Progress :D'})
        } else {
            return NextResponse.json(data, {status: 200})//return NextResponse.json({message: 'Work in Progress :D'})
        }
    }
}
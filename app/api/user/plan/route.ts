    import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
    import {cookies} from 'next/headers'
    import {NextRequest, NextResponse} from 'next/server'
    import {UserPlan} from "@/types/types.db";

    export async function PATCH(req: NextRequest) {
        const cookieStore = cookies()
        const supabase = createRouteHandlerClient({cookies: () => cookieStore})

        const {
            data: {session},
        } = await supabase.auth.getSession()
        if (!session) {
            return NextResponse.json("Unauthorized", {status: 401});
        } else {
            try {
                const userPlan: UserPlan = await req.json();

                // Dynamically construct the update object based on non-undefined properties
                const updateObject: Partial<UserPlan> = {};
                if (userPlan.goal_calories !== undefined) updateObject.goal_calories = userPlan.goal_calories;
                if (userPlan.goal_carbs !== undefined) updateObject.goal_carbs = userPlan.goal_carbs;
                if (userPlan.goal_fat !== undefined) updateObject.goal_fat = userPlan.goal_fat;
                if (userPlan.goal_protein !== undefined) updateObject.goal_protein = userPlan.goal_protein;

                const {data, error} = await supabase
                    .from('users')
                    .update(updateObject)
                    .eq('id', session.user.id)
                    .select('goal_calories, goal_carbs, goal_fat, goal_protein')
                    .single();

                if (error) {
                    return NextResponse.json("Error", {status: 500});
                } else {
                    return NextResponse.json(data, {status: 200});
                }
            } catch (e) {
                return NextResponse.json(e, {status: 500});
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
                .from('users')
                .select('goal_calories, goal_carbs, goal_fat, goal_protein')
                .eq('id', session.user.id)
                .single()

            if (error) {
                return NextResponse.json("Error", {status: 500})//return NextResponse.json({message: 'Work in Progress :D'})
            } else {
                return NextResponse.json(data, {status: 200})//return NextResponse.json({message: 'Work in Progress :D'})
            }
        }
    }
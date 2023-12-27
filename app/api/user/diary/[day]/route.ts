import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'
import axios from "axios";
import {Food} from "@/types/types.db";
import {convertToTSFood} from "@/actions/searchFoodHandler";

//set up types for request body
interface RequestBody {
    food: Food;
    serving_size: number;
    meal_type: number;
}

//set up types for route parameters
interface RouteProps {
    params: {
        day: string;
    }
}

export async function POST(req: NextRequest, RoutesProps: RouteProps) {
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
        //if logged in insert new diary entry
        //get day from request url /api/user/diary/[day]
        const day = RoutesProps.params.day
        //check if day is formatted yyyy-mm-dd
        const dateRegex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$')
        if (!dateRegex.test(day)) {
            //return error if not formatted correctly
            return NextResponse.json("Bad Request - please provide parameters {day=YYYY-MM-DD}", {status: 400})
        }
        //get new user data from request body
        try {
            //get food, serving_size and meal_type from request body {food: Food, serving_size: number, meal_type: number}
            const {food, serving_size, meal_type}: RequestBody = await req.json()

            const getURL = () => {
                // Automatically set by Vercel.
                // Make sure to include `https://` when not localhost.

                return process?.env?.NEXT_PUBLIC_VERCEL_ENV === 'production' ?
                    "https://caloriecompass.ch/" :
                    process?.env?.NEXT_PUBLIC_VERCEL_URL!
            }


            //check if food exists by checking if food.id is set
            if (!food.id) {
                try {
                    // If no ID, make a POST request to create a new food entry
                    const response = await axios.post(getURL()+'/api/food', food, {
                        headers: {
                            'Content-Type': 'application/json',
                            // Pass the cookie header along from the request
                            'cookie': req.headers.get('cookie')
                        },
                    });
                    // Use the ID of the newly created food entry
                    food.id = response.data.id;
                } catch (error) {
                    //return error if error
                    return NextResponse.json(error, {status: 500})
                }
            }
            //insert into diary
            const {data: newDiaryEntry, error: newDiaryEntryError} = await supabase
                .from('diary')
                .insert([{
                    user_id: session.user.id,
                    food_id: food.id,
                    date: day,
                    serving_size: serving_size,
                    meal_type: meal_type
                }]).select()
            //return error if error
            if (newDiaryEntryError) {
                //return error if error
                return NextResponse.json(newDiaryEntryError, {status: 500})
            }
            //return new diary entry
            return NextResponse.json(newDiaryEntry, {status: 200})//
        } catch (e) {
            //return error if error
            return NextResponse.json(e, {status: 500})
        }
    }
}


export async function DELETE(req: NextRequest, RoutesProps: RouteProps) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {
        //get all diary entries for user with id = session.user.id for day = req.query.day
        const id: number = await req.json()

        try {
            //delete diary entry
            const {data, error} = await supabase
                .from('diary')
                .delete()
                .eq('id', id)
                .select()
            //return error if error
            if (error) {
                return NextResponse.json(error, {status: 500})
            } else {
                return NextResponse.json(data, {status: 200})
            }
        } catch (e) {
            //return error if error
            return NextResponse.json(e, {status: 500})
        }


    }

}

export async function PATCH(req: NextRequest, RoutesProps: RouteProps) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {

        const {food, serving_size, meal_type, id} = await req.json()

        try {
            //delete diary entry
            const {data, error} = await supabase
                .from('diary')
                .update({serving_size: serving_size, meal_type: meal_type})
                .eq('id', id)
                .select()
            //return error if error
            if (error) {
                return NextResponse.json(error, {status: 500})
            } else {
                return NextResponse.json(data, {status: 200})
            }
        } catch (e) {
            //return error if error
            return NextResponse.json(e, {status: 500})
        }
    }

}


export async function GET(req: NextRequest, RoutesProps: RouteProps) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {
        //get all diary entries for user with id = session.user.id for day = req.query.day
        const day = RoutesProps.params.day
        //check if day is formatted yyyy-mm-dd
        const dateRegex = new RegExp('^\\d{4}-\\d{2}-\\d{2}$')
        if (!dateRegex.test(day)) {
            //return error if not formatted correctly
            return NextResponse.json("Bad Request - please provide parameters {day=YYYY-MM-DD}", {status: 400})
        }
        //get all diary entries for user with id = session.user.id for day = req.query.day
        const {data: diaryEntries, error: diaryEntriesError} = await supabase.from('diary')
            .select('id, food_id, serving_size, meal_type')
            .eq('user_id', session.user.id).eq('date', day)
        //return error if error
        if (diaryEntriesError) {
            return NextResponse.json(diaryEntriesError, {status: 500})
        }
        //get all food data for diary entries
        const foodIds = diaryEntries.map((diaryEntry) => diaryEntry.food_id)
        const {data: foodEntries, error: foodEntriesError} = await supabase.from('foods')
            .select(
                `id,
                 name,
                 brands(name),
                 barcode,
                 serving_factor,
                 units(unit),
                 calories,
                 fat,
                 saturated_fat,
                 carbohydrates,
                 sugar,
                 protein,
                 salt,
                 image,
                 source
                 `).in('id', foodIds)
        if (foodEntriesError) {
            console.log(foodEntriesError)
            return NextResponse.json(foodEntriesError, {status: 500})
        }
        //combine food data with diary entries

        let updatedFoods: Food[] = []
        updatedFoods.push(...foodEntries?.map((food) => convertToTSFood(food)))

        diaryEntries.forEach((diaryEntry) => {
                // @ts-ignore
                diaryEntry.food = updatedFoods.find((foodEntry) => foodEntry.id === diaryEntry.food_id)
                //calculate calories
                //@ts-ignore
                diaryEntry.calories = diaryEntry.food.calories * diaryEntry.serving_size
            }
        )
        const response = {
            day: day,
            total: {
                //@ts-ignore
                calories: diaryEntries.reduce((total, diaryEntry) => total + diaryEntry.calories, 0),
                //@ts-ignore
                protein: diaryEntries.reduce((total, diaryEntry) => total + diaryEntry.food.protein * diaryEntry.serving_size, 0),
                //@ts-ignore
                carbohydrates: diaryEntries.reduce((total, diaryEntry) => total + diaryEntry.food.carbohydrates * diaryEntry.serving_size, 0),
                //@ts-ignore
                fat: diaryEntries.reduce((total, diaryEntry) => total + diaryEntry.food.fat * diaryEntry.serving_size, 0),
                //@ts-ignore
                salt: diaryEntries.reduce((total, diaryEntry) => total + diaryEntry.food.salt * diaryEntry.serving_size, 0),
                //@ts-ignore
                sugar: diaryEntries.reduce((total, diaryEntry) => total + diaryEntry.food.sugar * diaryEntry.serving_size, 0),
                //@ts-ignore
                saturated_fat: diaryEntries.reduce((total, diaryEntry) => total + diaryEntry.food.saturated_fat * diaryEntry.serving_size, 0),
            },
            meals: {
                breakfast: {
                    //@ts-ignore
                    calories: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 1).reduce((total, diaryEntry) => total + diaryEntry.calories, 0),
                    //@ts-ignore
                    protein: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 1).reduce((total, diaryEntry) => total + diaryEntry.food.protein * diaryEntry.serving_size, 0),
                    //@ts-ignore
                    carbohydrates: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 1).reduce((total, diaryEntry) => total + diaryEntry.food.carbohydrates * diaryEntry.serving_size, 0),
                    //@ts-ignore
                    fat: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 1).reduce((total, diaryEntry) => total + diaryEntry.food.fat * diaryEntry.serving_size, 0),
                    entries: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 1)
                },
                lunch: {
                    //@ts-ignore
                    calories: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 2).reduce((total, diaryEntry) => total + diaryEntry.calories, 0),
                    //@ts-ignore
                    protein: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 2).reduce((total, diaryEntry) => total + diaryEntry.food.protein * diaryEntry.serving_size, 0),
                    //@ts-ignore
                    carbohydrates: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 2).reduce((total, diaryEntry) => total + diaryEntry.food.carbohydrates * diaryEntry.serving_size, 0),
                    //@ts-ignore
                    fat: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 2).reduce((total, diaryEntry) => total + diaryEntry.food.fat * diaryEntry.serving_size, 0),
                    //@ts-ignore
                    entries: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 2)
                },
                dinner: {
                    //@ts-ignore
                    calories: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 3).reduce((total, diaryEntry) => total + diaryEntry.calories, 0),
                    //@ts-ignore
                    protein: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 3).reduce((total, diaryEntry) => total + diaryEntry.food.protein * diaryEntry.serving_size, 0),
                    //@ts-ignore
                    carbohydrates: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 3).reduce((total, diaryEntry) => total + diaryEntry.food.carbohydrates * diaryEntry.serving_size, 0),
                    //@ts-ignore
                    fat: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 3).reduce((total, diaryEntry) => total + diaryEntry.food.fat * diaryEntry.serving_size, 0),
                    entries: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 3)
                },
                snacks: {
                    //@ts-ignore
                    calories: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 4).reduce((total, diaryEntry) => total + diaryEntry.calories, 0),
                    //@ts-ignore
                    protein: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 4).reduce((total, diaryEntry) => total + diaryEntry.food.protein * diaryEntry.serving_size, 0),
                    //@ts-ignore
                    carbohydrates: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 4).reduce((total, diaryEntry) => total + diaryEntry.food.carbohydrates * diaryEntry.serving_size, 0),
                    //@ts-ignore
                    fat: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 4).reduce((total, diaryEntry) => total + diaryEntry.food.fat * diaryEntry.serving_size, 0),
                    entries: diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 4)
                }
            }
        }
        return NextResponse.json(response, {status: 200})//
    }
}
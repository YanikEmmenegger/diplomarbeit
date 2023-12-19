import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'
import axios from "axios";
import {Food} from "@/types/types.db";

interface RequestBody {
    food: Food;
    day: string;
    serving_size: number;
    meal_type: number;
}

export async function POST(req: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {

        //const userid = req.headers.get('userid')
        const {food, day, serving_size, meal_type}: RequestBody = await req.json()

        //todo error handling if not all parameters are provided

        if (!food.id) {
            try {
                // If no ID, make a POST request to create a new food entry
                const response = await axios.post('http://localhost:3000/api/food', food, {
                    headers: {
                        'Content-Type': 'application/json',
                        'cookie': req.headers.get('cookie')
                        // Include any other headers needed for your request
                    },
                });

                // Use the ID of the newly created food entry
                food.id = response.data.id;
            } catch (error) {
                console.error(error);
                return NextResponse.json(error, {status: 500})
            }
        }
        //insert into diary
        const {data: newDiaryEntry, error: newDiaryEntryError} = await supabase
            .from('diary')
            .insert([{user_id: session.user.id, food_id: food.id, date: day, serving_size: serving_size, meal_type: meal_type}]).select()

        if (newDiaryEntryError) {
            console.log(newDiaryEntryError)
            return NextResponse.json(newDiaryEntryError, {status: 500})
        }
        return NextResponse.json(newDiaryEntry, {status: 200})//
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
        //get all diary entries for user with id = session.user.id for day = req.query.day
        const {searchParams} = new URL(req.url)
        const day = searchParams.get('day')
        if (!day) {
            return NextResponse.json("Bad Request - please provide search parameters {day=YYYY-MM-DD}", {status: 400})
        }
        const {data: diaryEntries, error: diaryEntriesError} = await supabase.from('diary')
            .select('food_id, serving_size, meal_type')
            .eq('user_id', session.user.id).eq('date', day)

        if (diaryEntriesError) {
            console.log(diaryEntriesError)
            return NextResponse.json(diaryEntriesError, {status: 500})
        }
        console.log(diaryEntries)

        //get all food data for diary entries
        const foodIds = diaryEntries.map((diaryEntry) => diaryEntry.food_id)
        const {data: foodEntries, error: foodEntriesError} = await supabase.from('foods')
            .select('id, name, calories, protein, carbohydrates, fat, image, salt, sugar, saturated_fat, unit')
            .in('id', foodIds)
        if (foodEntriesError) {
            console.log(foodEntriesError)
            return NextResponse.json(foodEntriesError, {status: 500})
        }

        //combine food data with diary entries
        diaryEntries.forEach((diaryEntry) => {
                // @ts-ignore
                diaryEntry.food = foodEntries.find((foodEntry) => foodEntry.id === diaryEntry.food_id)
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
                    entries: [diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 1),]
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
                    entries: [diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 2),]
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
                    entries: [diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 3),]
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
                    entries: [diaryEntries.filter((diaryEntry) => diaryEntry.meal_type === 4),]
                }
            }
        }
        return NextResponse.json(response, {status: 200})//
    }
}
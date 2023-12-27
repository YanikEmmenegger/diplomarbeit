import {NextRequest, NextResponse} from 'next/server'
import {Food} from "@/types/types.db";
import {APIResponse} from "@/types/types.api";
import {searchFood} from "@/actions/searchFoodHandler";
import {cookies} from "next/headers";
import {createRouteHandlerClient} from "@supabase/auth-helpers-nextjs";

export const revalidate = 60

export async function GET(request: NextRequest) {

    const {searchParams} = new URL(request.url)
    const product_name = searchParams.get('q')
    const barcode = searchParams.get('b')
    const limit = searchParams.get('limit')
    const extended_search: boolean = searchParams.get('extended_search')?.toString() === '1'

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    let foods: Food[] = [];
    //error handling provided search params
    if ((!barcode && !product_name) || (barcode && product_name)) {
        const response: APIResponse = {
            statusCode: {
                code: 400,
                message: (!barcode && !product_name) ?
                    'Bad Request - please provide search parameters {q=name_of_food} or {b=barcode_of_food} example: ' + request.nextUrl.origin + '/api/food?q=penne or /api/food?b=8076802085738' :
                    'Bad Request - please provide only 1 search parameters {q=name_of_food} or {b=barcode_of_food} example: ' + request.nextUrl.origin + '/api/food?q=penne or ' + request.nextUrl.origin + '/api/food?b=8076802085738'
            }
        };
        return NextResponse.json(response, {status: 400})
    }
    //get Foods by provided search param
    const foodsResults = barcode ?
        await searchFood({productBarcode: barcode!, limit: parseInt(limit!) || 20, extended_search: extended_search || false}, supabase) :
        await searchFood({productName: product_name!, limit: parseInt(limit!) || 20, extended_search: extended_search}, supabase)
    //check results on successful or error, extended_search:extended_search
    if (foodsResults instanceof Array) {
        //add foods to food array
        foods.push(...foodsResults)
    } else {
        //Return Error APIResponse to user
        const response: APIResponse = {
            statusCode: {code: foodsResults.errorCode, message: foodsResults.errorMessage},
        }
        return NextResponse.json(response, {status: foodsResults.errorCode});
    }
    //prepare successful API Response (can contain empty food array)
    const response: APIResponse = {
        statusCode: {code: 200, message: "OK"},
        count: foods.length,
        results: foods
    }
    //Return positive API Response to user
    return NextResponse.json(response, {status: 200})//return NextResponse.json({message: 'Work in Progress :D'})
}

export async function POST(request: NextRequest) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({cookies: () => cookieStore})

    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session) {
        return NextResponse.json("Unauthorized", {status: 401})//return NextResponse.json({message: 'Work in Progress :D'})
    } else {

        const food: Food = await request.json()
       //check if brand is already in db
        const {data: brand, error: brandError} = await supabase.from('brands').select('*').eq('name', food.brand)
        if (brandError) {
            console.log(brandError)
            return NextResponse.json(brandError, {status: 500})
        }
        if (brand.length === 0) {
            //insert brand into db
            const {data: newBrand, error: newBrandError} = await supabase.from('brands').insert([{name: food.brand}]).select()
            if (newBrandError) {
                console.log(newBrandError)
                return NextResponse.json(newBrandError, {status: 500})
            }
            food.brand = newBrand[0].id
        } else {
            food.brand = brand[0].id
        }
        //insert food into db
        food.unit === "g" ? food.unit = String(2) : food.unit = String(1)
        const {data: newFood, error: newFoodError} = await supabase.from('foods').insert([food]).select()
        if (newFoodError) {
            console.log(newFoodError)
            return NextResponse.json(newFoodError, {status: 500})
        }
        food.id = newFood[0].id

        return NextResponse.json(food, {status: 200})
    }
}
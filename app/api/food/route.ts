import {NextResponse} from 'next/server'
import {Food} from "@/types/types.db";
import {APIResponse} from "@/types/types.api";
export const revalidate = 60
export async function GET(request: Request) {

    const {searchParams} = new URL(request.url)
    const product_name = searchParams.get('q')
    const barcode = searchParams.get('b')
    const limit = searchParams.get('limit')

    let foods: Food[] = [];
    //error handling provided search params
    if ((!barcode && !product_name) || (barcode && product_name)) {
        const response: APIResponse = {
            statusCode: {
                code: 400,
                message: (!barcode && !product_name) ?
                    'Bad Request - please provide search parameters {q=name_of_food} or {b=barcode_of_food} example: /api/food?q=penne or /api/food?b=8076802085738' :
                    'Bad Request - please provide only 1 search parameters {q=name_of_food} or {b=barcode_of_food} example: /api/food?q=penne or /api/food?b=8076802085738'
            }
        };
        return NextResponse.json(response, {status: 400})
    }
    /*get Foods by provided search param
    const foodsResults = barcode ?
        await searchFood({productBarcode: barcode!, limit: parseInt(limit!) || 20}) :
        await searchFood({productName: product_name!, limit: parseInt(limit!) || 20})
    //check results on successful or error
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
    return NextResponse.json(response, {status: 200})*/

    return NextResponse.json({message: 'Work in Progress :D'})
}
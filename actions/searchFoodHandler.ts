import {Food} from "@/types/types.db";
import {APIError} from "@/types/types.api";
import {SupabaseClient} from '@supabase/supabase-js';
import {offFoodSearch} from "@/actions/openFoodFactsHandler";

//@ts-ignore
export const revalidate = 1;

interface searchOptions {
    productName?: string,
    productBarcode?: string,
    extended_search?: boolean
    limit?: number
}


const searchFood = async (search_options: searchOptions, supabase:SupabaseClient): Promise<Food[] | APIError> => {
    //set empty food array
    let foods: Food[] = [];
    //set extended search to false if barcode is provided
    (search_options.extended_search && search_options.productBarcode) ? search_options.extended_search = false : null
    //set column to search for
    const column = search_options.productBarcode !== undefined ? 'barcode' : 'name';

    //TODO: Add brand filter to search query
    //search for brands by product name if column is product name and not barcode
    /*const {data: brands, error: brandsError} = column === 'product_name'
        ? await supabase
            .from('brands')
            .select('id, brand_name')
            .ilike('brand_name', `%${search_options.productName}%`)
        : {data: null, error: null};

    const brandIds = brands?.length !== 0 ?  brands?.map((brand) => `${brand.id}`).join(', ') || '' : null;
    const brandFilter = brandIds ? `brand.in.(${brandIds})` : null
    console.log(brandFilter)*/
    //TODO: Add brand filter to search query

    //set serach string to barcode or product name
    const nameOrBarcode = search_options.productBarcode !== undefined ? `${search_options.productBarcode}` : `%${search_options.productName}%`;
    //return empty array if no search string is provided
    if (nameOrBarcode === `%${search_options.productName}%`) {
        if (search_options.productName === "") {
            return foods
        }
    }
    //set filter to search for
    const filter = column === 'name' ?
        `name.ilike.${nameOrBarcode}` :
        `barcode.eq.${nameOrBarcode}`
    //search for foods by barcode or product name
    const {data: dbFoodResults, error: dbFoodResultsError} = await supabase
        .from('foods')
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
                 `)
        .or(filter)
        .limit(search_options.limit || 20)
    if (dbFoodResultsError) {
        //TODO Handle Database Errors
    } else {
        foods.push(...dbFoodResults?.map((food) => convertToTSFood(food)))
    }
    //search for foods by barcode or product name on OpenFoodFacts if there were no results from supabase or extended search is enabled
    if (foods.length === 0 || search_options.extended_search) {
        const offResults: Food[] | APIError =
            search_options.productName ?
                await offFoodSearch({productName: search_options.productName, limit: search_options.limit}) :
                await offFoodSearch({productBarcode: search_options.productBarcode, limit: search_options.limit})
        if (offResults instanceof Array) {
            //add foods to food array
            foods.push(...offResults)
        } else {
            //return error if there was an error with the OpenFoodFacts API
            return offResults;
        }
    }
    return foods
}
export {searchFood}
const convertToTSFood = (food: any): Food => {
    return {
        id: food.id,
        name: food.name,
        brand: food.brands.brand_name || null,
        barcode: food.barcode,
        serving_factor: food.serving_factor,
        unit: food.units.unit || 'g',
        calories: food.calories,
        fat: food.fat,
        saturated_fat: food.saturated_fat,
        carbohydrates: food.carbohydrates,
        sugar: food.sugar,
        protein: food.protein,
        salt: food.salt,
        image: food.image,
        source: food.source
    }
}


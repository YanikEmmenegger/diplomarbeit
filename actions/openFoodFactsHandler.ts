import axios from "axios";
import {Food} from "@/types/types.db";
import {APIError} from "@/types/types.api";

interface offSearchOptions {
    productName?: string,
    productBarcode?: string
    limit?: number
}

const offSearchFood = async (searchOption: offSearchOptions): Promise<Food[] | APIError> => {
    //prepare url
    const url = searchOption.productName ?
        `https://world.openfoodfacts.org/cgi/search.pl?action=process&search_terms=${searchOption.productName}&sort_by=unique_scans_n&page_size=${searchOption.limit || 20 }?sort_by=product_name&json=1` :
        `https://world.openfoodfacts.org/api/v2/search?code=${searchOption.productBarcode}`
    //prepare headers
    const headers = {'User-Agent': 'FoodTrackerApp - NodeJSAPI - Version 0.1 - http://caloriecompass.ch/api/food - yanik1999@hotmail.com'};
    try {
        //get data from api
        const axiosResponse = await axios.get(url, {headers});
        //check if response is valid
        if (axiosResponse.status !== 200) {
            return {
                errorCode: axiosResponse.status, errorMessage: axiosResponse.statusText
            }
        }
        //parse data
        const offProducts = axiosResponse.data.products;
        return offProducts
            //@ts-ignore
            .map(product => parseFood(product))
            .filter((food: Food | null) => food !== null);
        //return parsed data
    } catch (e:any) {
        //return error
        return {
            errorCode: e.response?.status || "Unknown Error",
            errorMessage: e.response?.statusText + " @OpenFoodFacts" || "Unknown Error"
        }
    }
}

export {offSearchFood}
// Helper function to parse the product object returned by the Open Food Facts API
const parseFood = (product: any): Food | null => {
    // Check if the product object contains the required fields
    if (product.nutriments.fat_100g === undefined || product.nutriments.carbohydrates_100g === undefined || product.nutriments.proteins_100g === undefined) {
        return null
    }
    let productName = null;
    // Check if the product name is available
    if (!product.product_name) {
        // Check if the abbreviated product name is available
        if (!product.abbreviated_product_name) {
            // Check if the keywords are available
            if (product._keywords.length === 0) {
                // If none of the above are available, return null
                return null
            } else {
                // Otherwise, use the first keyword as the product name
                productName = product._keywords[1]
            }
        } else {
            // Otherwise, use the abbreviated product name as the product name
            productName = product.abbreviated_product_name
        }
    }
    // Return the parsed product object
    return {
        name: productName || product.product_name,
        brand: product.brands,
        barcode: product.code,
        //check if product is liquid or solid
        unit: determineProductType(product.serving_size),
        //calculate conversion factor (sering size / 100g)
        serving_factor: calculateConversionFactor(product.nutriments),
        //calculate calories (if not available in api) from fat, carbs and protein
        calories: product.nutriments['energy-kcal_100g'] || calculateCalories(product.nutriments.fat_100g, product.nutriments.carbohydrates_100g, product.nutriments.proteins_100g),
        fat: product.nutriments.fat_100g,
        saturated_fat: product.nutriments['saturated-fat'] || 0,
        carbohydrates: product.nutriments.carbohydrates_100g,
        sugar: product.nutriments.sugars_100g || 0,
        protein: product.nutriments.proteins_100g,
        salt: product.nutriments.salt_100g || 0,
        image: product.image_front_small_url,
        source: product.url
    }
}
const calculateCalories = (fat: number, carbohydrates: number, protein: number) => fat * 9 + carbohydrates * 4 + protein * 4;
const determineProductType = (productQuantity: any): string => {
    // Extract the quantity field from the product object
    const quantity = productQuantity || '';
    // Check for keywords that are commonly associated with liquids
    const isLiquid = ['ml', 'l', 'cl', 'dl', 'fl.oz', 'fluid ounce', 'oz', 'ounce', 'pt', 'pint', 'qt', 'quart', 'gal', 'gallon'].some(keyword => {
        return quantity.toLowerCase().includes(keyword);
    });
    // Check for keywords that are commonly associated with solids
    const isSolid = ['g', 'kg', 'mg', 'lb', 'pound', 'oz', 'ounce', 'ct', 'count'].some(keyword => {
        return quantity.toLowerCase().includes(keyword);
    });
    // Return a string indicating whether the product is a liquid, solid, or unknown
    if (isLiquid && !isSolid) {
        return 'ml';
    } else if (isSolid && !isLiquid) {
        return 'g';
    } else {
        return 'ml';
    }
}
const calculateConversionFactor = (nutriments: any) => {
    // Extract the nutrient content from the product object
    const carbsPerServing = parseFloat(nutriments.carbohydrates_serving);
    const carbsPer100g = parseFloat(nutriments.carbohydrates_100g);
    const fatPerServing = parseFloat(nutriments.fat_serving);
    const fatPer100g = parseFloat(nutriments.fat_100g);
    const proteinPerServing = parseFloat(nutriments.proteins_serving);
    const proteinPer100g = parseFloat(nutriments.proteins_100g);

    // Determine which nutrient to use as a fallback if carbohydrates are not available
    if (carbsPerServing && carbsPer100g) {
        return carbsPerServing / carbsPer100g;
    } else if (fatPerServing && fatPer100g) {
        return fatPerServing / fatPer100g;
    } else if (proteinPerServing && proteinPer100g) {
        return proteinPerServing / proteinPer100g;
    } else {
        return 1;
    }
}

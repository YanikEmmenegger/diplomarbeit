import {Food} from "@/types/types.db";


interface StatusCode {
    code: number,
    message: string
}

// Define the APIResponse interface
export interface APIResponse {
    statusCode: StatusCode,
    count?: number,
    results?: Food[]
}

export interface APIError {
    errorCode: number
    errorMessage: string
}

export interface DiaryEntry {
    food_id?: string;
    meal_type: number;
    calories?: number;
    food?: {
        protein: number;
        carbohydrates: number;
        fat: number;
        salt: number;
        sugar: number;
        saturated_fat: number;
    };
    serving_size: number;
}

export interface MealDetails {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    entries: DiaryEntry[];
}

export interface Meals {
    breakfast: MealDetails;
    lunch: MealDetails;
    dinner: MealDetails;
    snacks: MealDetails;
}

export interface DiaryResponse {
    day: string;
    total: {
        calories: number;
        protein: number;
        carbohydrates: number;
        fat: number;
        salt: number;
        sugar: number;
        saturated_fat: number;
    };
    meals: Meals;
}
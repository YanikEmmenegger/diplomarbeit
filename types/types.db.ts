export interface Food {
    id?: number
    name: string,
    brand?: string,
    barcode?: string,
    serving_factor: number,
    unit: string,
    calories: number,
    fat: number,
    saturated_fat: number,
    carbohydrates: number,
    sugar: number,
    protein: number,
    salt: number,
    image?: string,
    source?: string,
}

export interface User {
    created_at: string,
    email: string | null,
    firstname: string | null,
    birthdate: string | null,
    gender: number | null,
    goal_calories: number | null,
    goal_carbs: number | null,
    goal_fat: number | null,
    goal_protein: number | null,
    id: string,
    name: string | null,
    onboarding_complete: boolean
}

export interface UserDetails {
    email?: string,
    firstname?: string,
    name?: string,
    birthdate?: string,
    gender: number
}

export interface UserPlan {
    goal_calories?: number
    goal_carbs?: number
    goal_fat?: number
    goal_protein?: number
}

export interface Weight {
    created_at: string,
    weight: number
}

export interface Stats {
    max: number,
    current: number,
}

export interface Meal {
    name: string,
    calories: number,
    carbohydrates: number,
    fat: number,
    protein: number,
    entries: Food[] | null
}
export interface FoodEntry  {
    id?: number;
    calories: number;
    food_id?: number;
    serving_size: number;
    meal_type: number;
    food:Food,
    date? : string
}
export interface FoodModalItem {
    id?: number;
    food: Food;
    serving_size: number;
    meal_type: number;
    date? : string
}
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
    gender: number | null,
    goal_calories: number | null,
    goal_carbs: number | null,
    goal_fat: number | null,
    goal_protein: number | null,
    id: string,
    name: string | null,
    onboarding_complete: boolean
}

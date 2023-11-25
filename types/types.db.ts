export interface Food{
    id?:number
    name: string,
    brand?:string,
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

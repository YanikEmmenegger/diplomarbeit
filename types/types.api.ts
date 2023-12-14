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

export interface APIError{
    errorCode: number
    errorMessage: string
}
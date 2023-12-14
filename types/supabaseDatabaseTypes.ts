export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brands: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      diary: {
        Row: {
          created_at: string
          food_id: number
          id: number
          meal_type: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          food_id: number
          id?: number
          meal_type: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          food_id?: number
          id?: number
          meal_type?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diary_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diary_meal_type_fkey"
            columns: ["meal_type"]
            isOneToOne: false
            referencedRelation: "meal_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diary_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      foods: {
        Row: {
          barcode: string | null
          brand: number | null
          calories: number
          carbohydrates: number
          created_at: string
          fat: number
          id: number
          image: string | null
          name: string
          protein: number
          salt: number | null
          saturated_fat: number | null
          serving_factor: number | null
          source: string | null
          sugar: number | null
          unit: number | null
          updated_at: string | null
        }
        Insert: {
          barcode?: string | null
          brand?: number | null
          calories: number
          carbohydrates: number
          created_at?: string
          fat: number
          id?: number
          image?: string | null
          name: string
          protein: number
          salt?: number | null
          saturated_fat?: number | null
          serving_factor?: number | null
          source?: string | null
          sugar?: number | null
          unit?: number | null
          updated_at?: string | null
        }
        Update: {
          barcode?: string | null
          brand?: number | null
          calories?: number
          carbohydrates?: number
          created_at?: string
          fat?: number
          id?: number
          image?: string | null
          name?: string
          protein?: number
          salt?: number | null
          saturated_fat?: number | null
          serving_factor?: number | null
          source?: string | null
          sugar?: number | null
          unit?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "foods_brand_fkey"
            columns: ["brand"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "foods_unit_fkey"
            columns: ["unit"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          }
        ]
      }
      genders: {
        Row: {
          gender: string
          id: number
        }
        Insert: {
          gender: string
          id?: number
        }
        Update: {
          gender?: string
          id?: number
        }
        Relationships: []
      }
      heights: {
        Row: {
          created_at: string
          height: number
          user_id: string
        }
        Insert: {
          created_at: string
          height: number
          user_id: string
        }
        Update: {
          created_at?: string
          height?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "heights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      meal_types: {
        Row: {
          description: string | null
          id: number
          meal_type: string
        }
        Insert: {
          description?: string | null
          id?: number
          meal_type: string
        }
        Update: {
          description?: string | null
          id?: number
          meal_type?: string
        }
        Relationships: []
      }
      units: {
        Row: {
          description: string | null
          id: number
          unit: string
        }
        Insert: {
          description?: string | null
          id?: number
          unit: string
        }
        Update: {
          description?: string | null
          id?: number
          unit?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          firstname: string | null
          gender: number | null
          goal_calories: number | null
          goal_carbs: number | null
          goal_fat: number | null
          goal_protein: number | null
          id: string
          name: string | null
          onboarding_complete: boolean
        }
        Insert: {
          created_at?: string
          email?: string | null
          firstname?: string | null
          gender?: number | null
          goal_calories?: number | null
          goal_carbs?: number | null
          goal_fat?: number | null
          goal_protein?: number | null
          id?: string
          name?: string | null
          onboarding_complete?: boolean
        }
        Update: {
          created_at?: string
          email?: string | null
          firstname?: string | null
          gender?: number | null
          goal_calories?: number | null
          goal_carbs?: number | null
          goal_fat?: number | null
          goal_protein?: number | null
          id?: string
          name?: string | null
          onboarding_complete?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "users_gender_fkey"
            columns: ["gender"]
            isOneToOne: false
            referencedRelation: "genders"
            referencedColumns: ["id"]
          }
        ]
      }
      weights: {
        Row: {
          created_at: string
          user_id: string
          weight: number
        }
        Insert: {
          created_at: string
          user_id: string
          weight: number
        }
        Update: {
          created_at?: string
          user_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "weights_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

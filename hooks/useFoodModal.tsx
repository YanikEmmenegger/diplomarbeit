import {create} from "zustand";
import {Food, FoodEntry, FoodModalItem} from "@/types/types.db";

interface FoodModalStore{
    isOpen: boolean,
    foodModalItem: FoodModalItem,
    onOpen: (newFoodModalItem: FoodModalItem)=> void,
    onClose: ()=> void
}

const useFoodModal = create<FoodModalStore>((set) => ({
    isOpen: false,
    foodModalItem: {} as FoodModalItem,
    onOpen: (newFoodModalItem, ) => {
        set({isOpen: true, foodModalItem: newFoodModalItem})
    },
    onClose: () => set({isOpen: false, foodModalItem: {} as FoodModalItem}),
}))

export default useFoodModal
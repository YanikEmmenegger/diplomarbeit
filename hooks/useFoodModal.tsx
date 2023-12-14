import {create} from "zustand";
import {Food} from "@/types/types.db";

interface FoodModalStore{
    isOpen: boolean,
    food: Food,
    onOpen: (newFood: Food)=> void,
    onClose: ()=> void
}

const useFoodModal = create<FoodModalStore>((set) => ({
    isOpen: false,
    food: {} as Food,
    onOpen: (newFood) => {
        set({isOpen: true, food: newFood})
    },
    onClose: () => set({isOpen: false, food: {} as Food}),
}))

export default useFoodModal
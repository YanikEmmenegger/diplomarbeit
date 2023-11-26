"use client"

import Modal from "@/components/Modal";
import useFoodModal from "@/hooks/useFoodModal";




const FoodModal = ({}) => {
    const foodModal = useFoodModal()
    const onChange = (open: boolean) => {
        if (!open) {
            foodModal.onClose()
        }
    }
    return (
        <Modal isOpen={foodModal.isOpen} onChange={onChange} title="Log Food" description="">
            <div className={"flex flex-col items-center justify-center"}>
                Food infos here
                {foodModal.food.name}
            </div>
        </Modal>
    )
}

export default FoodModal;

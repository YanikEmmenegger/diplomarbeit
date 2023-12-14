"use client"

import Modal from "@/components/Modal";
import useFoodModal from "@/hooks/useFoodModal";
import Image from "next/image";
import {twMerge} from "tailwind-merge";




const FoodModal = ({}) => {
    const foodModal = useFoodModal()
    const onChange = (open: boolean) => {
        if (!open) {
            foodModal.onClose()
        }
    }
    return (
        <Modal isOpen={foodModal.isOpen} onChange={onChange} title={foodModal.food.name} description={foodModal.food.brand!} >
            <div className={"flex flex-col items-center justify-center"}>
                <div className="flex flex-row gap-x-4">
                    <Image
                        width={100}
                        height={100}
                        className={twMerge("h-12 w-12 transition-opacity flex-none rounded-full bg-gray-50")}
                        src={foodModal.food.image || "/images/logo.png"}
                        alt=""
                        loading={"lazy"}
                    />
                </div>

            </div>
        </Modal>
    )
}

export default FoodModal;

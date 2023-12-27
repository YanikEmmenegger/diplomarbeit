"use client"

import Modal from "@/components/Modal";
import useFoodModal from "@/hooks/useFoodModal";
import Image from "next/image";
import {twMerge} from "tailwind-merge";
import {useState} from "react";
import {getDisplayNameofDate} from "@/components/diary/DiaryNavigation";
import {Food, FoodEntry} from "@/types/types.db";
import FoodModalContent from "@/components/Food/FoodModalContent";


const FoodModal = ({}) => {
    const foodModal = useFoodModal()
    const onChange = (open: boolean) => {
        if (!open) {
            foodModal.onClose()
        }
    }

    return (
        <Modal isOpen={foodModal.isOpen} onChange={onChange} title="Nahrungsmittel hinzufügen"
               description={""}>
            <div className={"flex flex-col gap-6 w-full"}>
                <FoodModalContent foodModalItem={foodModal.foodModalItem}/>

            </div>
        </Modal>
    )
}

export default FoodModal;

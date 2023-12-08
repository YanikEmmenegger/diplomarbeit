'use client'
import {FC} from "react";
import toast from "react-hot-toast";
import {CiBarcode} from "react-icons/ci";

interface BarcodeButtonProps {

}

const BarcodeButton: FC<BarcodeButtonProps> = ({}) => {
    return (
        <button onClick={()=>toast.success("might come soon")}>{/*TODO open Barcode scanner*/}
            <div className="relative right-0 p-4 rounded-full border-2 border-CalorieCompass-Primary border-solid">
                <CiBarcode style={{fontSize: "30px", color: "whitesmoke"}}></CiBarcode>
            </div>
        </button>    );
}
export default BarcodeButton;
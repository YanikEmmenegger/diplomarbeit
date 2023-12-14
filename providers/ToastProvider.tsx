"use client"

import {Toaster} from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster position="top-center" toastOptions={
            {
                style: {
                    background: "#ff9f0f",
                    color: "#fff"
                }
            }
        }/>
    )
}
export default ToasterProvider
'use client'
import {FC} from "react";
import toast from "react-hot-toast";

interface ErrorMessageProps {
    errorMessage: string,
    errorCode: number
}

const ErrorMessage: FC<ErrorMessageProps> = ({errorCode, errorMessage}) => {
    toast.error(errorMessage)
    return (
        <div>Something went wrong - sorry</div>
    );
}

export default ErrorMessage;
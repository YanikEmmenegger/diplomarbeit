import {FC} from "react";


interface InputProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    value: string;
    id?: string;
}

const Input: FC<InputProps> = ({onChange, placeholder, value, id}) => {
    return (
            <input id={id} onChange={onChange} placeholder={placeholder} value={value} className="h-auto p-4 opacity-75 focus:opacity-100 transition-opacity outline-none border-b-2 bg-transparent border-b-CalorieCompass-Primary w-3/4"/>
    );
}

export default Input;
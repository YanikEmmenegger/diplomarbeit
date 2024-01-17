import {FC} from "react";

interface OnboardingInputProps {
    value: number | string
    onChange: (input: HTMLInputElement) => void;
    name: string;
    placeholder: string;
    label: string;
    hideLabel?: boolean;
    pattern?: string;
    id?: string,

}

const OnboardingInput: FC<OnboardingInputProps> = ({value, onChange, name, label, placeholder, pattern, hideLabel, id}) => {
    return (
        <>
            {!hideLabel && <label className="input-label block mb-2 text-white">
                {label}
            </label>}


            <input
                id={id}
                type="text"
                name={name}
                placeholder={placeholder}
                value={value}
                max={10000001}
                maxLength={10000001}
                pattern={pattern ? pattern : ".*"}
                onChange={(e) => {
                    onChange(e.target)
                }}
                className="h-auto rounded-lg p-3 opacity-50 focus:opacity-100 transition-opacity duration-500 ease-in-out outline-none mb-2  border-2 bg-transparent border-CalorieCompass-Primary w-full"
            />
        </>
    );
}

export default OnboardingInput;
import { InputControls } from "../../../types/components/FormTypes";

interface TextInputProps {
    inputControls: InputControls,
    name: string,
    label: string,
    required?: boolean,
    className?: string
}

const TextAreaInput = (props: TextInputProps) => {
    const { name, label, required, className } = props

    const { register, errors } = props.inputControls

    return (
        <textarea
            {...register(name, { required: required ?? false })}
            placeholder={label}
            className={`
                p-3 rounded-md text-black
                focus:outline-none
                ${errors[name] ? 
                    'ring-red-400 ring-2' :
                    'ring-blue-400 focus:ring-2'
                }
                ${className}
            `}
        />
    )
}

export default TextAreaInput
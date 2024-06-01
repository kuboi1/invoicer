import { FieldErrors, FieldValues, UseFormRegister, ValidationRule } from "react-hook-form";

interface TextInputProps {
    register: UseFormRegister<FieldValues>,
    name: string,
    label: string,
    errors: FieldErrors,
    required?: boolean,
    pattern?: ValidationRule<RegExp>,
    className?: string
}

const TextInput = (props: TextInputProps) => {
    const { register, name, label, required, errors, pattern, className } = props

    console.log(errors[name])

    return (
        <input
            {...register(name, { required: required ?? false, pattern: pattern })}
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

export default TextInput
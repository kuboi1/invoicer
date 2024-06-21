import { useEffect } from "react";
import { ValidationRule, useWatch } from "react-hook-form";
import { InputControls, InputType } from "../../../types/components/FormTypes";

interface TextInputProps {
    inputControls: InputControls,
    name: string,
    label: string,
    type?: InputType,
    required?: boolean,
    maxLength?: number,
    pattern?: ValidationRule<RegExp>,
    className?: string,
    onChangeFormat?: (value: string) => string
}

const TextInput = (props: TextInputProps) => {
    const { name, label, required, maxLength, type, pattern, className, onChangeFormat } = props

    const { control, register, setValue, errors } = props.inputControls

    const needsWatch = maxLength || onChangeFormat || type === InputType.Int || type === InputType.Float

    const formatInt = (value: string) => value.replace(/\D/g, '')

    const formatFloat = (value: string) => {
        // Remove any non-digit and non-period characters
        value = value.replace(/[^0-9.]/g, '')

        // Split the value on periods to separate the integer and decimal parts
        const parts = value.split('.')

        // If there's more than one period, keep only the first integer and first decimal part
        if (parts.length > 2) {
            value = parts[0] + '.' + parts[1]
        } else {
            value = parts.join('.')
        }

        return value
    }

    const watch = useWatch({ control, name })
    
    useEffect(() => {
        // Handle watch if needed
        if (needsWatch && watch) {
            let value: string = (typeof watch === 'string') ? watch : String(watch)

            // Format int input
            if (type === InputType.Int) {
                value = formatInt(value)
            }

            // Format float input
            if (type === InputType.Float) {
                value = formatFloat(value)
            }

            // Format on change
            if (onChangeFormat) {
                value = onChangeFormat(value)
            }

            // Handle max length
            if (maxLength && value.length > maxLength) {
                value = value.substring(0, maxLength)
            }

            setValue(name, value)
        }
    }, [needsWatch, watch, setValue, maxLength, name, onChangeFormat, type])

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
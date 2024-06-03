import { useCallback, useState } from "react"

interface FormPresetProps {
    name: string,
    isFocused: boolean,
    onClick: () => void,
    color?: string
}

const FormPreset = (props: FormPresetProps) => {
    const { name, isFocused, onClick, color } = props

    const baseColor = color ?? '#00aaff'

    const [hover, setHover] = useState<boolean>(false)

    const getBgColor = useCallback(() => {
        if (isFocused) {
            return baseColor
        }

        let opacity = '80' // 50%

        if (hover) {
            opacity = 'BF' // 75%
        }

        return `${baseColor}${opacity}`
    }, [hover, isFocused, baseColor])

    return (
        <button 
            type='button'
            className='p-2 rounded-lg transition-colors font-bold'
            style={{
                backgroundColor: getBgColor(),
                outline: (isFocused ? 'solid 2px white' : undefined)
            }}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {name}
        </button>
    )
}

export default FormPreset
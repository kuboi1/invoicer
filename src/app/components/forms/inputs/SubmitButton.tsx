
interface SubmitButtonProps {
    text: string
}

const SubmitButton = (props: SubmitButtonProps) => {
    const { text } = props

    return (
        <button 
            type="submit"
            className='bg-blue-400 rounded-md p-3 hover:bg-blue-500 transition-colors'
        >
            {text}
        </button>
    )
}

export default SubmitButton
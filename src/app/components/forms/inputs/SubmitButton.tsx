
interface SubmitButtonProps {
    text: string
}

const SubmitButton = (props: SubmitButtonProps) => {
    const { text } = props

    return (
        <button 
            type="submit"
            className='button-primary'
        >
            {text}
        </button>
    )
}

export default SubmitButton
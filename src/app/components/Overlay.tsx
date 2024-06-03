import { PropsWithChildren } from "react"

interface OverlayProps extends PropsWithChildren {
    className?: string
}

const Overlay = (props: OverlayProps) => {
    const { children, className } = props

    return (
        <div className={`absolute inset-0 w-full h-full bg-zinc-800 flex justify-center items-center ${className ?? ''}`}>
            {children}
        </div>
    )
}

export default Overlay
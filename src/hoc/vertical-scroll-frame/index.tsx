
interface Props {
    className: string;
    children: React.ReactNode
}

const VerticalScrollFrame = ({ className, children}: Props) => {
    return <div className={className}>
        {children}
    </div>
}

export default VerticalScrollFrame;
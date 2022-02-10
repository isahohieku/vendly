
interface Props {
    className?: string;
    children: React.ReactNode
}

const Card = ({ className, children }: Props) => {
    return (<div className={className}>
        {children}
    </div>);
}

export default Card;
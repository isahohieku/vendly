interface Props {
    children: React.ReactNode;
}

const StepperFrame = ({ children }: Props) => {
    return(<div className="h-[586px] w-full border bg-white border-[#82ECD3] rounded-[10px] flex flex-col relative">
        {children}
    </div>)
}

export default StepperFrame;
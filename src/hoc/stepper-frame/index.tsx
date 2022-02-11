interface Props {
  children: React.ReactNode;
  className?: string;
}

const StepperFrame = ({ children, className }: Props) => {
  return (
    <div
      className={
        'w-full border bg-white border-[#82ECD3] rounded-[10px] flex flex-col relative ' +
        (className || 'h-[586px]')
      }
    >
      {children}
    </div>
  );
};

export default StepperFrame;

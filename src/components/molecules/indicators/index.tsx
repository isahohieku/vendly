type Indicator = { active: number };

interface Props {
  indicators: Indicator[];
  active: number;
}

const Indicators = ({ active = 0, indicators }: Props) => {
  return (
    <div className="flex items-center">
      {indicators.map((_, ind) => (
        <div
          key={ind}
          className={
            'h-1 w-[34px] bg-[#C6F6F2] ml-5 ' +
            (ind < active ? 'bg-[#17E7B3]' : '') +
            (ind === active ? 'bg-[#006E72]' : '')
          }
        ></div>
      ))}
    </div>
  );
};

export default Indicators;

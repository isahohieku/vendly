import Input from '@atoms/input';
import type { UseFormRegister } from 'react-hook-form';
import type { SearchForm } from 'src/types/forms';

interface Prop {
  register: UseFormRegister<SearchForm>;
  resetUser: () => void;
  value: string;
}

const UserSearchForm = ({ register, value, resetUser }: Prop) => {
  const handleKeyUp = (key: string) => {
    if (key === 'Backspace') {
      resetUser();
    }
  };
  return (
    <div>
      <Input
        placeholder="Search / Insert their Twitter handle"
        register={register}
        name="search"
        value={value}
        onKeyUp={(e) => handleKeyUp(e.key)}
        className="appearance-none placeholder-[#00D0BE] placeholder-search focus:outline-none text-[14.8px] w-full font-bold"
      />
    </div>
  );
};

export default UserSearchForm;

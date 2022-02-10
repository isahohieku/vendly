import Input from "@atoms/input";
import { UseFormRegister } from "react-hook-form";
import { SearchForm } from "src/types/forms";

interface Prop {
    register: UseFormRegister<SearchForm>;
}

const UserSearchForm = ({ register }: Prop) => {
    return (<div>
        <Input
            placeholder="Search/ Insert their Twitter handle"
            register={register}
            name="search"
            className="appearance-none placeholder-[#00D0BE] placeholder-search focus:placeholder-search-focus focus:outline-none text-[14.8px] w-full font-bold"
        />
    </div>)
}

export default UserSearchForm;
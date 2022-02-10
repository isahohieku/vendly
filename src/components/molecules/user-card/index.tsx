import Button from "@atoms/button";
import { mockUser } from "@libs/mock-data";
import Avatar from "react-avatar";
import { IUser } from "src/types/users";

interface Props {
    user: IUser;
    selectedUser(user: IUser): void;
}

const UserCard = ({ user, selectedUser }: Props) => {
    return (<Button className="items-center flex my-[18px]" onClick={() => { selectedUser(user); console.log('Clicked') }}>
        <Avatar size="37" src={user?.picture?.medium } name={`${user?.name?.first} ${user?.name?.last}`} />
        <div className="ml-3">
            <p className="leading-[22px] text-[13.5px] font-semibold">{user.name.first} {user.name.last}</p>
            <p className="leading-[19.73px] text-[12.3px] font-normal">@{mockUser.username || user?.name?.first.toLowerCase()}</p>
        </div>
    </Button>)
}

export default UserCard;
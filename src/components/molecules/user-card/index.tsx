import Button from '@atoms/button';
import { mockUser } from '@libs/mock-data';
import Avatar from 'react-avatar';
import type { IUser } from 'src/types/users';

interface Props {
  user: IUser;
  selectedUser(user: IUser): void;
}

const UserCard = ({ user, selectedUser }: Props) => {
  return (
    <Button className="items-center flex my-[18px] text-left" onClick={() => selectedUser(user)}>
      <Avatar
        size="37"
        src={user?.picture?.medium}
        name={`${user?.name?.first} ${user?.name?.last}`}
      />
      <div className="ml-3">
        <p className="leading-[22px] text-[13.5px] font-semibold">
          {user.name.first} {user.name.last}
        </p>
        <p className="leading-[19.73px] text-[12.3px] font-normal">
          @{!user?.username ? user?.name?.first.toLowerCase() : mockUser.username}
        </p>
      </div>
    </Button>
  );
};

export default UserCard;

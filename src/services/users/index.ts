import { Api } from '@libs/api';
import { femaleNames, maleNames, mockUser } from '@libs/mock-data';
import type { InfiniteQueryObserverOptions } from 'react-query';
import { useInfiniteQuery } from 'react-query';
import { random, sleep } from '@utils/functions';
import type { IUserResponse, IUser } from '@types';

const USER_API_BASE = '';

export const getFakeUsers = async ({ pageParam = 1 }) => {
  await sleep(2);
  const res: IUserResponse = await Api.get(
    `${USER_API_BASE}?page=${pageParam}&results=10&seed=foobar`,
  );

  const { results } = res;

  const refactoredUsers = results.map(user => {
    const randomFirstname = random(7);
    const randomLastname = random(7);
    const newUser = user;

    if (user.gender === 'female') {
      newUser.name.first = femaleNames[randomFirstname];
      newUser.name.last = maleNames[randomLastname];
      newUser.username = user.username;

      return newUser;
    }

    newUser.name.first = maleNames[randomFirstname];
    newUser.name.last = maleNames[randomLastname];
    newUser.username = user.username;

    return newUser;
  });

  res.results = refactoredUsers as IUser[];

  if (pageParam === 2) {
    res.results.push(mockUser);
  }
  return res;
};

export const useGetUsers = (
  options: InfiniteQueryObserverOptions<IUserResponse, string, IUserResponse>,
) =>
  useInfiniteQuery<IUserResponse, string, IUserResponse>({
    queryKey: 'fake-users',
    queryFn: getFakeUsers,
    ...options,
  });

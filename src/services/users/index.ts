import { Api } from "@libs/api";
import { mockUser } from "@libs/mock-data";
import { InfiniteQueryObserverOptions, useInfiniteQuery } from "react-query";
import { IUserResponse } from "src/types/users";

const USER_API_BASE = '';

export const getFakeUsers = async ({ pageParam = 1 }) => {
    const res: IUserResponse = await Api.get(`${USER_API_BASE}?page=${pageParam}&results=10&seed=foobar`);
    res.results.push(mockUser)
    return res;
}

export const useGetUsers = (
    options: InfiniteQueryObserverOptions<IUserResponse, string, IUserResponse>,
) =>
    useInfiniteQuery<IUserResponse, string, IUserResponse>({
        queryKey: 'fake-users',
        queryFn: getFakeUsers,
        ...options,
    });
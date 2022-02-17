import type { IApiResponse } from '@libs/api/types';

export interface IUser {
  username: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  email: string;
  isVendly: boolean;
}

interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface IUserResponse {
  results: IUser[];
  info: Info;
}

export interface UsersResponse extends IApiResponse {
  data: IUserResponse;
}

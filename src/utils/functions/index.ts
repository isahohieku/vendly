import type { IUser } from '@types';

/**
 * Fake Async utility
 * @param  {number} duration in seconds
 * @returns Promise
 */
export const sleep = (duration: number) =>
  new Promise((resolve) => setTimeout(() => resolve(null), duration * 1000));

export const random = (maxNumber: number) => Math.floor(Math.random() * maxNumber) + 1

export const filterUsers = (users: IUser[], search: string) => users.filter(user =>
  user?.name?.first.toLowerCase().includes(search.toLowerCase()) ||
  user?.name?.last.toLowerCase().includes(search.toLowerCase()) ||
  user?.username?.toLowerCase().includes(search.toLowerCase()) ||
  user?.username?.toLowerCase().includes(search.substring(1).toLowerCase()) ||
  user?.name.last
    ?.toLowerCase()
    .includes(search.substring(1).toLowerCase()) ||
  `${user?.name?.first} ${user?.name?.last}`
    .toLowerCase()
    .includes(search.toLowerCase()))

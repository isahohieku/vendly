/**
 * Fake Async utility
 * @param  {number} duration in seconds
 * @returns Promise
 */
 export const sleep = (duration: number) =>
 new Promise(resolve => setTimeout(() => resolve(null), duration * 1000));
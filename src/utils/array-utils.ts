/**
 * Compares two arrays of strings for equality
 * @param arr1 First array of strings
 * @param arr2 Second array of strings
 * @returns boolean indicating if arrays are equal
 */
export const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
  if (arr1 === arr2) return true
  if (!arr1 || !arr2) return false
  if (arr1.length !== arr2.length) return false

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }

  return true
}

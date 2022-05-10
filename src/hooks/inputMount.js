import { useEffect } from 'react';

/**
 * Takes in an input and creates an effect on it, to listen for changes
 * @param {*} input
 * @returns
 */
export const useMountEffect = input => useEffect(input, []);

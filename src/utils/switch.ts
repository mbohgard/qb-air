/**
 * Shorthand switch
 * swtch(value, [case1, result1], [case2, result2]) ?? defaultResult
 */
export const swtch = <T, R>(
  target: T,
  ...cases: Readonly<Array<[T, R]>>
): R | undefined => {
  for (const [k, v] of cases) {
    if (target === k) return v;
  }

  return undefined;
};

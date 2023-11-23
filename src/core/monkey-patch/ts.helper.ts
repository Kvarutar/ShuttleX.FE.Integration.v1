export const nameof = <T extends object>(f: (x: T) => any): keyof T => {
  const p = new Proxy<T>({} as T, {
    get: key => key,
  });
  return f(p);
};

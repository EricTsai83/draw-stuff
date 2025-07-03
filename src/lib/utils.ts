import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 添加 resolvablePromise 函數
export const resolvablePromise = <T>() => {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: any) => void;

  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  (promise as any).resolve = resolve;
  (promise as any).reject = reject;

  return promise as Promise<T> & {
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
  };
};

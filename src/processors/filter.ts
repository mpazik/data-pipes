import { Processor, ProcessorMultiOut } from "./processor";

export function filter<T, S extends T>(
  predicate: (v: T) => v is S
): Processor<T, S>;

export function filter<T>(predicate: (v: T) => boolean): Processor<T>;

export function filter<T>(predicate: (v: T) => boolean): Processor<T> {
  return (callback) => (v) => {
    if (predicate(v)) callback(v);
  };
}

export function split<T>(
  predicate: (v: T) => boolean
): ProcessorMultiOut<T, [T, T]> {
  return ([onFirst, onSecond]) => (value) => {
    predicate(value) ? onFirst(value) : onSecond(value);
  };
}

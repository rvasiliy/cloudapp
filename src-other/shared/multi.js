export function multi(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Arguments not are numbers');
  }

  return a * b;
}

export function present<T>(value: T): value is NonNullable<T> {
  return value != null && value !== '';
}

export function presence<T>(value: T, fallback: NonNullable<T>) {
  return present(value) ? value : fallback;
}

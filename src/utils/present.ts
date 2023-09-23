export function present<T>(value: T): value is NonNullable<T> {
  return value != null && value !== '';
}

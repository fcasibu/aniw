const defaultOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
} as Intl.DateTimeFormatOptions;

export function dateFormat(date: string, options = defaultOptions) {
  const formatter = new Intl.DateTimeFormat('en', options);

  return formatter.format(new Date(date));
}

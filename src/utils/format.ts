export function formatStringDate(
  dateString?: string,
  options?: Intl.DateTimeFormatOptions
): string | null {
  if (!dateString) return null;

  const date = new Date(dateString);

  return date.toLocaleDateString(undefined, options);
}

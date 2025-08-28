/**
 * Transform a date to string
 * @param date Date to be converted
 * @returns The string represented the date or the actual date if param date is null or undefined
 */
export function dateToString(date?: Date | undefined | null | string): string {
  if (!date) {
    return new Date().toISOString().slice(0, 10);
  }
  if (typeof (date) === "string") {
    return date;
  }
  return date.toISOString().slice(0, 10);
}
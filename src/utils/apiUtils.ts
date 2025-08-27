/**
 * Transforms the date strings within the fetched data into Date objects.
 * @param data The data fetched from the API, which may contain date strings.
 * @returns The transformed data with date strings converted to Date objects.
 */
export function transformDataFetchWithDates<T extends { date?: string | Date }>(data: T | T[]): T | T[] {
  if (Array.isArray(data)) {
    return data.map(element => {
      return element.date ? { ...element, date: new Date(element.date) } : element;
    });
  } else {
    return data.date ? { ...data, date: new Date(data.date) } : data
  }
}
import type { Session } from "../types/types";

/**
 * Transforms the date strings within the fetched data into Date objects.
 * @param data The data fetched from the API, which may contain date strings.
 * @returns The transformed data with date strings converted to Date objects.
 */
export function transformDataFetchWithDate<T extends { sessions?: Session[], date?: Date | string }>(data: T | T[]): T | T[] {
  if (Array.isArray(data)) {
    return data.map(element => {
      if ("sessions" in element && Array.isArray(element.sessions)) {
        return {...element, sessions: element.sessions.map((session) => ({...session, date: new Date(session.date)}))}
      }
      return element.date ? { ...element, date: new Date(element.date) } : element;
    });
  } else {
    if ("sessions" in data && Array.isArray(data.sessions)) {
      return {...data, sessions: data.sessions.map((session) => ({...session, date: new Date(session.date)}))}
    }
    return data.date ? { ...data, date: new Date(data.date) } : data
  }
}
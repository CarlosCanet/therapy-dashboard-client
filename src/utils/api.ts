import { type Patient, type PatientWithSessions, type Session, type SessionWithPatient } from "../types/types";

// /**
//  * Transforms the date strings within the fetched data into Date objects.
//  * @param data The data fetched from the API, which may contain date strings.
//  * @returns The transformed data with date strings converted to Date objects.
//  */
// export function transformDataFetchWithDate<T extends { sessions?: Session[], date?: Date | string }>(data: T | T[]): T | T[] {
//   if (Array.isArray(data)) {
//     return data.map(element => {
//       if ("sessions" in element && Array.isArray(element.sessions)) {
//         return {...element, sessions: element.sessions.map((session) => ({...session, date: new Date(session.date)}))}
//       }
//       return element.date ? { ...element, date: new Date(element.date) } : element;
//     });
//   } else {
//     if ("sessions" in data && Array.isArray(data.sessions)) {
//       return {...data, sessions: data.sessions.map((session) => ({...session, date: new Date(session.date)}))}
//     }
//     return data.date ? { ...data, date: new Date(data.date) } : data
//   }
// }

/**
 * Transforms the date strings within the fetched data into Date objects.
 * @param data The data fetched from the API, which may contain date strings.
 * @returns The transformed data with date strings converted to Date objects.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformPatient(data: any): Patient | Patient[] {
  if (Array.isArray(data)) {
    return data.map(element => transformOnePatient(element));
  }
  return transformOnePatient(data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformPatientWithSessions(data: any): PatientWithSessions | PatientWithSessions[] {
  if (Array.isArray(data)) {
    return data.map(element => transformOnePatientWithSessions(element));
  }
  return transformOnePatientWithSessions(data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformSession(data: any): Session | Session[]{
  console.log("T", data)
  if (Array.isArray(data)) {
    return data.map(element => {
      return transformOneSession(element);
    });
  }
  return transformOneSession(data);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformSessionWithPatient(data: any): SessionWithPatient | SessionWithPatient[] {
  console.log("T", data)
  if (Array.isArray(data)) {
    return data.map(element => {
      return transformOneSessionWithPatient(element);
    });
  }
  return transformOneSessionWithPatient(data);
}

function transformOneSession(session: Session) {
  return { ...session, date: new Date(session.date) };
}

function transformOneSessionWithPatient(session: SessionWithPatient) {
  return { ...session, date: new Date(session.date), patient: transformOnePatient(session.patient) };
}

function transformOnePatient(patient: Patient) {
  return { ...patient, dob: new Date(patient.dob) }
}

function transformOnePatientWithSessions(patient: PatientWithSessions) {
  return { ...patient, dob: new Date(patient.dob), sessions: patient.sessions.map(session => transformOneSession(session)) }
}

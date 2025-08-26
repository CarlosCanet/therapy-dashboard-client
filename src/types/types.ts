export type Gender = "Male" | "Female" | "Non-binary" | "Gender neutral" | "Agender" | "Pangender" | "Genderqueer" | "None";

export interface Patient {
  id: string,
  name: string,
  age: number,
  gender: Gender,
  issues: string [],
  treatments: string [],
  activitiesPending: Activity[],
  activitiesDone: Activity[]
}

export interface Activity {
  name: string,
  duration: number,
  description: string
}

export interface TreatmentInfo {
  treatment: string,
  date: Date,
  info: string
}

export interface Session {
  id: string,
  patientId: string,
  date: Date,
  description: string,
  problems: string,
  activitiesReviewed: Activity,
  activitiesProposed: Activity,
  treatmentInfo: TreatmentInfo 
}
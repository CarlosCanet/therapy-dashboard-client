export const Genders = {
  Male: "Male",
  Female: "Female",
  NonBinary: "Non-binary",
  GenderNeutral: "Gender neutral",
  Agender: "Agender",
  Pangender: "Pangender",
  Genderqueer: "Genderqueer",
  None: "None"
} as const;

export type Gender = typeof Genders[keyof typeof Genders];

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
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

export interface PatientTreatment {
  id: string,
  name: string,
}

export interface Patient {
  id: string,
  name: string,
  dob: Date,
  gender: Gender,
  issues: string [],
  treatments: PatientTreatment [],
  activitiesPending: Activity[],
  activitiesDone: Activity[],
}

export type PatientWithSessions = Patient & { sessions: Session[] };
export type NewPatient = Omit<Patient, "id">;

export interface Activity {
  name: string,
  duration: number,
  description: string
}

export interface TreatmentInfo {
  id: string;
  name: string;
  labName: string;
  activePrinciples: string;
  needPrescription: boolean;
  isGeneric: boolean;
  treatmentImageURL: string;
  boxImageURL: string;
  technichalDocURL: string;
  leafletURL: string;
  administration: string;
  pharmaForm: string,
  dosage: string
}

export interface RemoteAPITreatment {
  nregistro: string,
  nombre: string,
  labtitular: string,
  pactivos: string,
  receta: boolean,
  generico: boolean,
  fotos: {tipo: string, url: string, fecha: string}[],
  docs: {tipo: string, url: string, urlHtml:string, fecha: string}[],
  viasAdministracion: {id: string, nombre: string}[],
  formaFarmaceuticaSimplificada: {id: string, nombre: string},
  dosis: string
}

export interface Session {
  id: string,
  patientId: string,
  date: Date,
  description: string,
  problems: string,
  activitiesReviewed: Activity[],
  activitiesProposed: Activity[]
}

export type SessionWithPatient = Session & { patient: Patient };
export type NewSession = Omit<Session, "id">;

export interface ToastInfo {
  variant: string;
  message: string;
}
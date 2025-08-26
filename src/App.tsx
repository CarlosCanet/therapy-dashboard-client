import { Route, Routes } from "react-router"
import NavbarDashboard from "./components/NavbarDashboard"
import DashboardPage from "./pages/DashboardPage"
import NotFoundPage from "./pages/NotFoundPage"
import { useEffect, useState } from "react";
import type { Patient, Session } from "./types/types";
import { useFetch, type APIResponse } from "./hooks/useFetch";
import Loading from "./components/Loading";
import PatientsListPage from "./pages/PatientPages/PatientsListPage";
import PatientInfoPage from "./pages/PatientPages/PatientInfoPage";
import NewPatientPage from "./pages/PatientPages/NewPatientPage";
import SessionsListPage from "./pages/SessionPages/SessionsListPage";
import SessionInfoPage from "./pages/SessionPages/SessionInfoPage";
import NewSessionPage from "./pages/SessionPages/NewSessionPage";
import SessionsListTreePage from "./pages/SessionPages/SessionsListTreePage";
import TreatmentInfoPage from "./pages/TreatmentPages/TreatmentInfoPage";
import NewTreatmentPage from "./pages/TreatmentPages/NewTreatmentPage";

function App() {
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const patientsApiResponse: APIResponse<Patient[]> = useFetch<Patient[]>(`${import.meta.env.VITE_API_URL}/patients`);
  const sessionsApiResponse: APIResponse<Session[]> = useFetch<Session[]>(`${import.meta.env.VITE_API_URL}/sessions`);
  useEffect(() => {
    if (!patientsApiResponse.loading && patientsApiResponse.data) {
      setPatients(patientsApiResponse.data);
    }
  }, [patientsApiResponse]);
  useEffect(() => {
    if (!sessionsApiResponse.loading && sessionsApiResponse.data) {
      setSessions(sessionsApiResponse.data);
    }
  }, [sessionsApiResponse]);
  return (
    <>
      <NavbarDashboard />
      <Routes>
        <Route path="/" element={patientsApiResponse.loading || sessionsApiResponse.loading ? <Loading /> : <DashboardPage patients={patients} sessions={sessions} />}></Route>
        
        <Route path="/patients" element={patientsApiResponse.loading ? <Loading /> : <PatientsListPage patients={patientsApiResponse.data ?? []} />}></Route>
        <Route path="/patients/:patientId" element={<PatientInfoPage />}></Route>
        <Route path="/new-patient" element={<NewPatientPage />}></Route>
        
        <Route path="/sessions" element={<SessionsListPage />}></Route>
        <Route path="/sessions/:sessionId" element={<SessionInfoPage />}></Route>
        <Route path="/new-session" element={<NewSessionPage />}></Route>
        <Route path="/sessions/tree" element={<SessionsListTreePage />}></Route>
        
        <Route path="/treatment-info/:treatmentId" element={<TreatmentInfoPage />}></Route>
        <Route path="/new-treatment" element={<NewTreatmentPage />}></Route>
       
        
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  )
}

export default App

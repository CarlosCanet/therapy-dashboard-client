import { Route, Routes } from "react-router"
import NavbarDashboard from "./components/NavbarDashboard"
import DashboardPage from "./pages/DashboardPage"
import NotFoundPage from "./pages/NotFoundPage"
import { useEffect, useState } from "react";
import type { Patient, Session } from "./types/types";
import { useFetch, type APIResponse } from "./hooks/useFetch";
import Loading from "./components/Loading";

function App() {
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const patientsApiResponse: APIResponse<Patient[]> = useFetch<Patient[]>(`${import.meta.env.VITE_API_URL}/patients`);
  const sessionsApiResponse: APIResponse<Session[]> = useFetch<Session[]>(`${import.meta.env.VITE_API_URL}/sessions`);
  useEffect(() => {
    if (!patientsApiResponse.loading && patientsApiResponse.data) {
      setPatients(patientsApiResponse.data);
    }
  }, [patientsApiResponse.data, patientsApiResponse.loading]);
  useEffect(() => {
    if (!sessionsApiResponse.loading && sessionsApiResponse.data) {
      setSessions(sessionsApiResponse.data);
    }
  }, [sessionsApiResponse.data, sessionsApiResponse.loading]);
  return (
    <>
      <NavbarDashboard />
      <Routes>
        <Route path="/" element={patientsApiResponse.loading || sessionsApiResponse.loading ? <Loading /> : <DashboardPage patients={patients} sessions={sessions} />}></Route>
        
        
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  )
}

export default App

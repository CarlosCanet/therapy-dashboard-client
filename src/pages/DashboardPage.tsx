import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard"
import type { Patient, Session } from "../types/types"
import { useFetch, type APIResponse } from "../hooks/useFetch";
import Loading from "../components/Loading";
import { transformDataFetchWithDates } from "../utils/apiUtils";

function DashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const patientsApiResponse: APIResponse<Patient> = useFetch<Patient>("get", `${import.meta.env.VITE_API_URL}/patients`);
  const sessionsApiResponse: APIResponse<Session> = useFetch<Session>("get", `${import.meta.env.VITE_API_URL}/sessions?_expand=patient`, transformDataFetchWithDates);
  useEffect(() => {
    if (!patientsApiResponse.loading && patientsApiResponse.data && Array.isArray(patientsApiResponse.data)) {
      setPatients(patientsApiResponse.data);
    }
  }, [patientsApiResponse]);
  useEffect(() => {
    if (!sessionsApiResponse.loading && sessionsApiResponse.data && Array.isArray(sessionsApiResponse.data)) {
      setSessions(sessionsApiResponse.data);
    }
  }, [sessionsApiResponse]);
  return (
    <div>
      {patientsApiResponse.loading || sessionsApiResponse.loading ? <Loading /> : 
        <>
          <DashboardCard title="Patients" elements={patients} />
          <DashboardCard title="Sessions" elements={sessions} />
        </>
      }
    </div>
  )
}
export default DashboardPage
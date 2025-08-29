import { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard"
import type { Patient, Session } from "../types/types"
import { useFetch, type APIResponse } from "../hooks/useFetch";
import Loading from "../components/Loading";
import { transformSession } from "../utils/api";
import { Col, Row } from "react-bootstrap";

function DashboardPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const patientsApiResponse: APIResponse<Patient> = useFetch<Patient>("get", `${import.meta.env.VITE_API_URL}/patients`);
  const sessionsApiResponse: APIResponse<Session> = useFetch<Session>("get", `${import.meta.env.VITE_API_URL}/sessions?_expand=patient`, transformSession);
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
        <Row>
          <Col md={6}>
            <DashboardCard title="Patients" elements={patients} />
          </Col>
          <Col md={6}>
            <DashboardCard title="Sessions" elements={sessions} />
          </Col>
        </Row>
      }
    </div>
  )
}
export default DashboardPage
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { type Patient, type Session } from "../../types/types";
import { useEffect, useState } from "react";
import { useFetch, type APIResponse } from "../../hooks/useFetch";

import SessionList from "../../components/SessionList";
import { transformDataFetchWithDate } from "../../utils/api";

function SessionListPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(undefined);
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const [sortField, setSortField] = useState<string>("");
  console.log("Query:", `${import.meta.env.VITE_API_URL}/sessions?_expand=patient${selectedPatient ? `&patientId=${selectedPatient.id}` : ""}`)
  const sessionsApiResponse: APIResponse<Session> = useFetch<Session>("get", `${import.meta.env.VITE_API_URL}/sessions?_expand=patient${selectedPatient ? `&patientId=${selectedPatient.id}` : ""}`, transformDataFetchWithDate);
  const patientsApiResponse: APIResponse<Patient> = useFetch<Patient>("get", `${import.meta.env.VITE_API_URL}/patients`);
  useEffect(() => {
    if (!sessionsApiResponse.loading && sessionsApiResponse.data && Array.isArray(sessionsApiResponse.data)) {
      setSessions(sessionsApiResponse.data);
    }
  }, [sessionsApiResponse]);
  useEffect(() => {
    if (!patientsApiResponse.loading && patientsApiResponse.data && Array.isArray(patientsApiResponse.data)) {
      setPatients(patientsApiResponse.data);
    }
  }, [patientsApiResponse]);

  const handleOnChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPatient(patients.find(patient => patient.id === event.target.value));
  }

  const handleOnChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "dateFrom") {
      setFilterStartDate(new Date(event.target.value));
    } else if (event.target.name === "dateTo") {
      setFilterEndDate(new Date(event.target.value));
    }
  }

  const handleOnChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(event.target.value);
  }

  const sessionWithinStartDate    = (session: Session) => !filterStartDate || session.date >= filterStartDate;
  const sessionWithinEndDate      = (session: Session) => !filterEndDate || session.date <= filterEndDate;
  const sessionsSortByPatientAsc  = (session1: Session, session2: Session) => (session1.patient?.name ?? "").localeCompare((session2.patient?.name) ?? "");
  const sessionsSortByPatientDesc = (session1: Session, session2: Session) => (session2.patient?.name ?? "").localeCompare((session1.patient?.name) ?? "");
  const sessionsSortByDateAsc     = (session1: Session, session2: Session) => session1.date.getTime() - session2.date.getTime();
  const sessionsSortByDateDesc = (session1: Session, session2: Session) => session2.date.getTime() - session1.date.getTime();
  
  const sortedSessions = [...sessions].filter(sessionWithinStartDate).filter(sessionWithinEndDate);
  switch (sortField) {
    case "alphaAsc":
      sortedSessions.sort(sessionsSortByPatientAsc);
      break;
    case "alphaDsc":
      sortedSessions.sort(sessionsSortByPatientDesc);
      break;
    case "dateAsc":
      sortedSessions.sort(sessionsSortByDateAsc);
      break;
    case "dateDsc":
      sortedSessions.sort(sessionsSortByDateDesc);
      break;
  }

  return (
    <div>
      <h1>Session List</h1>
      <Form.Group>
        <FloatingLabel label="Patient name" className="my-3" controlId="patientNameFilter">
          <Form.Select value={selectedPatient?.id} onChange={handleOnChangeSelect}>
            <option value="">All patients</option>
            {patients.map(patient => <option value={patient.id} key={patient.id}>{patient.name}</option>)}
          </Form.Select>
        </FloatingLabel>
        <Row>
          <FloatingLabel as={Col} label="Date from" className="my-3" controlId="dateFromFilter">
            <Form.Control size="sm" name="dateFrom" type="date" placeholder="DD/MM/YYYY" onChange={handleOnChangeDate}/>
          </FloatingLabel>
          <FloatingLabel as={Col} label="Date to" className="my-3" controlId="dateToFilter">
            <Form.Control size="sm" name="dateTo" type="date" onChange={handleOnChangeDate}/>
          </FloatingLabel>
        </Row>
        <FloatingLabel label="Sort by" className="my-3" controlId="dateToFilter">
          <Form.Select value={sortField} onChange={handleOnChangeSort}>
            <option value=""></option>
            <option value="alphaAsc">Alphabetical ↑</option>
            <option value="alphaDsc">Alphabetical ↓</option>
            <option value="dateAsc">Date ↑</option>
            <option value="dateDsc">Date ↓</option>
          </Form.Select>
        </FloatingLabel>
      </Form.Group>
      <SessionList sessions={sortedSessions}/>
    </div>
  )
}
export default SessionListPage
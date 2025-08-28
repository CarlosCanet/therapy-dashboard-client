import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { type Patient, type Session } from "../../types/types";
import { useEffect, useState } from "react";
import { useFetch, type APIResponse } from "../../hooks/useFetch";

import SessionList from "../../components/SessionList";
import { transformDataFetchWithDate } from "../../utils/api";
import SessionListTree from "../../components/SessionListTree";

function SessionListPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(undefined);
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const [sortField, setSortField] = useState<string>("");
  const [isGrouped, setIsGrouped] = useState(false);
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
      setFilterStartDate(event.target.value ? new Date(event.target.value) : null);
    } else if (event.target.name === "dateTo") {
      setFilterEndDate(event.target.value ? new Date(event.target.value) : null);
    }
  }

  const handleOnChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsGrouped(event.target.checked);
  }

  const handleOnChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(event.target.value);
  }

  const sessionWithinStartDate  = (session: Session) => !filterStartDate || session.date >= filterStartDate;
  const sessionWithinEndDate    = (session: Session) => !filterEndDate || session.date <= filterEndDate;
  const sessionsByPatientAsc    = (session1: Session, session2: Session) => (session1.patient?.name ?? "").localeCompare((session2.patient?.name) ?? "");
  const sessionsByPatientDesc   = (session1: Session, session2: Session) => (session2.patient?.name ?? "").localeCompare((session1.patient?.name) ?? "");
  const sessionsByDateAsc       = (session1: Session, session2: Session) => session1.date.getTime() - session2.date.getTime();
  const sessionsByDateDesc      = (session1: Session, session2: Session) => session2.date.getTime() - session1.date.getTime();
  const patientsByNameAsc       = (patient1: Patient, patient2: Patient) => patient1.name.localeCompare(patient2.name);
  const patientsByNameDesc      = (patient1: Patient, patient2: Patient) => patient2.name.localeCompare(patient1.name);
  
  const sortedSessions = sessions.filter(sessionWithinStartDate).filter(sessionWithinEndDate);
  const sortedPatients = [...patients];
  switch (sortField) {
    case "alphaAsc":
      sortedSessions.sort(sessionsByPatientAsc);
      sortedPatients.sort(patientsByNameAsc);
      break;
    case "alphaDsc":
      sortedSessions.sort(sessionsByPatientDesc);
      sortedPatients.sort(patientsByNameDesc);
      break;
    case "dateAsc":
      sortedSessions.sort(sessionsByDateAsc);
      break;
    case "dateDsc":
      sortedSessions.sort(sessionsByDateDesc);
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
        <Row className="align-items-center">
          <Col>
            <Form.Switch label="Group by patient" checked={isGrouped} onChange={handleOnChecked} />
          </Col>
          <Col>
            <FloatingLabel label="Sort by" className="my-3" controlId="dateToFilter">
              <Form.Select value={sortField} onChange={handleOnChangeSort}>
                <option value=""></option>
                <option value="alphaAsc">Alphabetical ↑</option>
                <option value="alphaDsc">Alphabetical ↓</option>
                <option value="dateAsc">Date ↑</option>
                <option value="dateDsc">Date ↓</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
      </Form.Group>
      {isGrouped ? <SessionListTree sessions={sortedSessions} patients={sortedPatients}/> : <SessionList sessions={sortedSessions}/>}
    </div>
  )
}
export default SessionListPage
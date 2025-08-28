import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import type { Session } from "../../types/types";
import { useEffect, useState } from "react";
import { useFetch, type APIResponse } from "../../hooks/useFetch";

import SessionList from "../../components/SessionList";
import { transformDataFetchWithDate } from "../../utils/api";

function SessionListPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const sessionsApiResponse: APIResponse<Session> = useFetch<Session>("get", `${import.meta.env.VITE_API_URL}/sessions?_expand=patient`, transformDataFetchWithDate);
  useEffect(() => {
    if (!sessionsApiResponse.loading && sessionsApiResponse.data && Array.isArray(sessionsApiResponse.data)) {
      setSessions(sessionsApiResponse.data);
    }
  }, [sessionsApiResponse]);

  const handleOnChange = () => {

  }

  return (
    <div>
      <h1>Session List</h1>
      <Form.Group>
        <FloatingLabel label="Patient name" className="my-3" controlId="patientNameFilter">
          <Form.Control type="text" placeholder="Search patient" onChange={handleOnChange}/>
        </FloatingLabel>
        <Row>
          <FloatingLabel as={Col} label="Date from" className="my-3" controlId="dateFromFilter">
            <Form.Control size="sm" type="date" placeholder="Search patient" onChange={handleOnChange}/>
          </FloatingLabel>
          <FloatingLabel as={Col} label="Date to" className="my-3" controlId="dateToFilter">
            <Form.Control size="sm" type="date" placeholder="Search patient" onChange={handleOnChange}/>
          </FloatingLabel>
        </Row>
        <FloatingLabel label="Sort by" className="my-3" controlId="dateToFilter">
          <Form.Control type="date" placeholder="Search patient" onChange={handleOnChange}/>
        </FloatingLabel>
      </Form.Group>
      <SessionList sessions={sessions}/>
    </div>
  )
}
export default SessionListPage
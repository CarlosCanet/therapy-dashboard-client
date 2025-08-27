import ListGroup from "react-bootstrap/ListGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import type { Session } from "../../types/types";
import { Link } from "react-router";
import { Trash } from "react-bootstrap-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFetch, type APIResponse } from "../../hooks/useFetch";
import { transformDataFetchWithDates } from "../../utils/apiUtils";

function sessionHasId(session: Session): session is Session & { id: string }{
  return session.id !== undefined && session.id !== null;
}

function SessionListPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const sessionsApiResponse: APIResponse<Session> = useFetch<Session>("get", `${import.meta.env.VITE_API_URL}/sessions?_expand=patient`, transformDataFetchWithDates);
  useEffect(() => {
    if (!sessionsApiResponse.loading && sessionsApiResponse.data && Array.isArray(sessionsApiResponse.data)) {
      setSessions(sessionsApiResponse.data);
    }
  }, [sessionsApiResponse]);

  const handleOnChange = () => {

  }

  const handleDelete = async (event: React.MouseEvent, sessionId: string) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`);
      console.log(response);
      // const index = sessions.findIndex((session) => session.id === sessionId);
      // setSessions(session.toSpliced(index, 1));
    } catch (error) {
      console.log(error); //! Show something
    }
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
      <ListGroup>
        {sessions && 
          sessions
            .filter(sessionHasId)
            .map(session => (
            <ListGroup.Item as={Link} to={`/sessions/${session.id}`} key={session.id} className="d-flex justify-content-between align-items-center">
              {session.patient ? session.patient.name : session.patientId} - Session {session.date.toLocaleDateString()}
              <Button variant="danger" className="d-flex justify-content-between align-items-center" onClick={(event) => handleDelete(event, session.id)}><Trash color="white" /></Button>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
    </div>
  )
}
export default SessionListPage
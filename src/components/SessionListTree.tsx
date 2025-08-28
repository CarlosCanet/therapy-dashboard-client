import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Trash } from "react-bootstrap-icons";
import axios from "axios";
import type { SessionWithPatient } from "../types/types";
import { Link } from "react-router";

type SessionListTreeProps = { sessions: SessionWithPatient[] };

function SessionListTree({ sessions }: SessionListTreeProps) {
  const patients = Array.from(new Map(sessions.map(session => [session.patient.id, session.patient.name])).entries());
  const handleDelete = async (event: React.MouseEvent, sessionId: string) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`);
    } catch (error) {
      console.log(error); //! Show something
    }
  }
  
  return (
    <Accordion>
      {patients
        .map(([patientId, patientName]) => (
        <Accordion.Item key={patientId} eventKey={patientId}>
          <Accordion.Header>{patientName}</Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              {sessions
                .filter(session => session.patientId === patientId)
                .map(session => (
                  <ListGroup.Item as={Link} to={`/sessions/${session.id}`} key={session.id} className="d-flex justify-content-center align-items-center">
                    {session.date.toLocaleDateString()}
                    <Button variant="danger" className="d-flex justify-content-between align-items-center" onClick={(event) => handleDelete(event, session.id)}><Trash color="white" /></Button>
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>

        ))}
    </Accordion>
  )
}
export default SessionListTree;
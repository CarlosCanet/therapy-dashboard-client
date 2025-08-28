import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Trash } from "react-bootstrap-icons";
import axios from "axios";
import type {  Patient, Session } from "../types/types";
import { Link } from "react-router";

type SessionListTreeProps = { sessions: Session[], patients: Patient[] };

function SessionListTree({ sessions, patients }: SessionListTreeProps) {

  const handleDelete = async (event: React.MouseEvent, sessionId: string) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`);
      // const index = sessions.findIndex((session) => session.id === sessionId);
      // setSessions(session.toSpliced(index, 1));
    } catch (error) {
      console.log(error); //! Show something
    }
  }

  return (
    <Accordion>
      {patients.map(patient => (
        <Accordion.Item key={patient.id} eventKey={patient.id}>
          <Accordion.Header>{patient.name}</Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              {sessions
                .filter(session => session.patientId === patient.id)
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
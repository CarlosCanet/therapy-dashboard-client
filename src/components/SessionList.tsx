import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Trash } from "react-bootstrap-icons";
import axios from "axios";
import type { Session, SessionWithPatient } from "../types/types";
import { Link } from "react-router";
import { dateToDisplay } from "../utils/date";
import ToastMessage from "./ToastMessage";
import { useState } from "react";

function SessionList({ sessions }: { sessions: Session[] | SessionWithPatient[] }) {
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleDelete = async (event: React.MouseEvent, sessionId: string) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`);
    } catch (error) {
      console.error("Error removing the session:", error);
      setShowToast(true);
    }
  }

  return (
    <>
      <ListGroup>
        {sessions && 
          sessions
          .map((session, index) => (
            <ListGroup.Item as={Link} to={`/sessions/${session.id}`} key={session.id} className="d-flex justify-content-between align-items-center" variant="danger">
              {/* {session.patient ? session.patient.name : index+1} - Session {session.date.toLocaleDateString()} */}
                {"patient" in session ? session.patient.name : index + 1} - Session {dateToDisplay(session.date)}
              <Button variant="danger" className="d-flex justify-content-between align-items-center" onClick={(event) => handleDelete(event, session.id)}><Trash color="white" /></Button>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
      <ToastMessage variant="danger" message="Something went wrong deleting" delay={5000} show={showToast} setShow={setShowToast}/>
    </>
  )
}
export default SessionList;
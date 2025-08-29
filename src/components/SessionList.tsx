import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Trash } from "react-bootstrap-icons";
import axios from "axios";
import type { Session, SessionWithPatient } from "../types/types";
import { Link } from "react-router";
import { dateToDisplay } from "../utils/date";

function SessionList({ sessions }: { sessions: Session[] | SessionWithPatient[] }) {

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
  )
}
export default SessionList;
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { Trash } from "react-bootstrap-icons";
import axios from "axios";
import type { Session } from "../types/types";
import { Link } from "react-router";

function SessionList({ sessions }: { sessions: Session[] }) {

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
    <ListGroup>
        {sessions && 
          sessions
            .map((session, index) => (
            <ListGroup.Item as={Link} to={`/sessions/${session.id}`} key={session.id} className="d-flex justify-content-between align-items-center">
              {session.patient ? session.patient.name : index+1} - Session {session.date.toLocaleDateString()}
              <Button variant="danger" className="d-flex justify-content-between align-items-center" onClick={(event) => handleDelete(event, session.id)}><Trash color="white" /></Button>
            </ListGroup.Item>
          ))
        }
      </ListGroup>
  )
}
export default SessionList;
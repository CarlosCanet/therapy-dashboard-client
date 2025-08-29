import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import type { Patient, Session } from "../types/types";
import Loading from "./Loading";
import { Link } from "react-router";
import { dateToDisplay } from "../utils/date";


type DashboardCardProps = {title: "Sessions", elements: Session[] } | {title: "Patients", elements: Patient[] }

function DashboardCard({ title, elements }: DashboardCardProps) {
  const isSession = title === "Sessions";
  return (
    <div className="d-flex flex-column justify-content-center align-align-items-stretch my-5">
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Link to={`/${title.toLowerCase()}`} className="link-danger link-underline-opacity-0">
            <div className="d-flex justify-content-center align-items-center my-3">
              {isSession ? (
                <Badge bg="danger" className="badge-circle rounded-circle d-flex align-items-center justify-content-center border border-5 border-primary text-primary ">{elements.length}</Badge>
              ) : (
                <Badge bg="primary" className="badge-circle rounded-circle d-flex align-items-center justify-content-center fs-1 border border-5 border-danger text-danger">{elements.length}</Badge>
              )}
            </div>
          </Link>
          <ListGroup>
            {elements === null ? <Loading /> : elements.map(element => <ListGroup.Item action key={element.id} as={Link} to={`/${title.toLowerCase()}/${element.id}`}>{"date" in element ? dateToDisplay(element.date) : element.name}</ListGroup.Item>)}
            
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}
export default DashboardCard;

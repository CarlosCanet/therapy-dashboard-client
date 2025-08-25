import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import type { Patient, Session } from "../types/types";
import Loading from "./Loading";

interface DashboardCardProps {
  title: "Sessions" | "Patients";
  elements: Patient[] | Session[] | null;
}

function DashboardCard({ title, elements }: DashboardCardProps) {
  return (
    <div className="d-flex flex-column justify-content-center align-align-items-stretch my-5">
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div className="d-flex justify-content-center align-items-center my-3">
            {title.toLowerCase() === "sessions" ? (
              <Badge bg="danger" className="badge-circle rounded-circle d-flex align-items-center justify-content-center border border-5 border-primary text-primary ">{elements?.length}</Badge>
            ) : (
              <Badge bg="primary" className="badge-circle rounded-circle d-flex align-items-center justify-content-center fs-1 border border-5 border-danger text-danger">{elements?.length}</Badge>
            )}
          </div>
          <ListGroup>
            {elements === null ? <Loading /> : elements.map(element => <ListGroup.Item action key={element.id} href="/">{"date" in element ? element.date.toLocaleDateString() : element.name}</ListGroup.Item>)}
            
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}
export default DashboardCard;

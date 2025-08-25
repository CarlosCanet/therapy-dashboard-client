import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function DashboardCard({ title }: { title: "Sessions" | "Patients" }) {
  return (
    <div className="d-flex flex-column justify-content-center align-align-items-stretch my-5">
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div className="d-flex justify-content-center align-items-center my-3">
            {title.toLowerCase() === "sessions" ? (
              <Badge bg="danger" className="badge-circle rounded-circle d-flex align-items-center justify-content-center border border-5 border-primary text-primary ">300</Badge>
            ) : (
              <Badge bg="primary" className="badge-circle rounded-circle d-flex align-items-center justify-content-center fs-1 border border-5 border-danger text-danger">3</Badge>
            )}
          </div>
          <ListGroup>
            <ListGroup.Item action href="/">{title} 1</ListGroup.Item>
            <ListGroup.Item action href="/">{title} 2</ListGroup.Item>
            <ListGroup.Item action href="/">{title} 3</ListGroup.Item>
            <ListGroup.Item action href="/">{title} 4</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
}
export default DashboardCard;

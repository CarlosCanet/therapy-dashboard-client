import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import LostGif from "../assets/Lost.gif"
import { useNavigate } from "react-router"

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Card className="text-center" style={{ width: '50vw' }}>
            <Card.Img variant="top" src={LostGif} />
            <Card.Body>
              <Card.Title>You're lost!</Card.Title>
              <Card.Text>
                You tried to reach something, but this is not the right path
              </Card.Text>
              <Button variant="secondary" onClick={() => navigate(-1)}>Go back</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
export default NotFoundPage
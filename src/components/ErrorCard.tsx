import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import WrongGif from "../assets/Wrong.gif"

function ErrorCard() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Card className="text-center" style={{ width: '50vw' }}>
            <Card.Img variant="top" src={WrongGif} />
            <Card.Body>
              <Card.Title>Something went wrong!</Card.Title>
              <Card.Text>
                Sometimes the page needs about 1 minute to load the data. 
                Or maybe something went very wrong.
              </Card.Text>
              <Button variant="secondary">Go back</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
export default ErrorCard;
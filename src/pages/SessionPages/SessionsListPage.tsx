import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function SessionsListPage() {
  const handleOnChange = () => {

  }
  return (
    <div>
      <h1>Session List</h1>
      <Form.Group>
        <FloatingLabel label="Patient name" className="my-3" controlId="patientNameFilter">
          <Form.Control type="text" placeholder="Search patient" onChange={handleOnChange}/>
        </FloatingLabel>
        <FloatingLabel label="Date from" className="my-3" controlId="dateFromFilter">
          <Form.Control type="date" placeholder="Search patient" onChange={handleOnChange}/>
        </FloatingLabel>
        <FloatingLabel label="Date to" className="my-3" controlId="dateToFilter">
          <Form.Control type="date" placeholder="Search patient" onChange={handleOnChange}/>
        </FloatingLabel>
        <FloatingLabel label="Srot by" className="my-3" controlId="dateToFilter">
          <Form.Control type="date" placeholder="Search patient" onChange={handleOnChange}/>
        </FloatingLabel>
      </Form.Group>
      <ListGroup>

      </ListGroup>
    </div>
  )
}
export default SessionsListPage
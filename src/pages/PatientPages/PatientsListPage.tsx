import { ListGroup } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import type { Patient } from "../../types/types";

interface PatientsListProps {
  patients: Patient[];
}

function PatientsListPage({patients}: PatientsListProps) {
  const handleOnChange = () => {
    console.log("CHANGE!");
  }
  return (
    <div>
      <h1>Patient List</h1>
      <FloatingLabel label="Patient name" className="my-3" controlId="patientNameFilter">
        <Form.Control type="text" placeholder="Search patient" onChange={handleOnChange}/>
      </FloatingLabel>
      <ListGroup>
        {patients.map(patient => <ListGroup.Item>{patient.name}</ListGroup.Item>)}        
      </ListGroup>
    </div>
  );
}
export default PatientsListPage;

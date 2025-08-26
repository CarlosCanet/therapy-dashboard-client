import ListGroup from "react-bootstrap/ListGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import type { Patient } from "../../types/types";
import { Link } from "react-router";
import { Trash } from "react-bootstrap-icons";
import axios from "axios";

interface PatientsListProps {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

function patientHasId(patient: Patient): patient is Patient & { id: string }{
  return patient.id !== undefined && patient.id !== null;
}

function PatientsListPage({ patients, setPatients }: PatientsListProps) {
const handleOnChange = () => {
    console.log("CHANGE!");
  };

  const handleDelete = async (event: React.MouseEvent, patientId: string) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/patients/${patientId}`);
      console.log(response);
      const index = patients.findIndex((patient) => patient.id === patientId);
      setPatients(patients.toSpliced(index, 1));
    } catch (error) {
      console.log(error); //! Show something
    }
  }
  
  return (
    <div>
      <h1>Patient List</h1>
      <FloatingLabel label="Patient name" className="my-3" controlId="patientNameFilter">
        <Form.Control type="text" placeholder="Search patient" onChange={handleOnChange} />
      </FloatingLabel>
      <ListGroup>
        {patients
          .filter(patientHasId)
          .map((patient) => (
          (<ListGroup.Item action as={Link} to={`/patients/${patient.id}`} key={patient.id} className="d-flex justify-content-between align-items-center">
            {patient.name}
            <Button variant="danger" className="d-flex justify-content-between align-items-center" onClick={(event) => handleDelete(event, patient.id)}><Trash color="white" /></Button>
          </ListGroup.Item>)
        ))}
      </ListGroup>
    </div>
  );
}
export default PatientsListPage;

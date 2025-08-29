import ListGroup from "react-bootstrap/ListGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import type { Patient } from "../../types/types";
import { Link } from "react-router";
import { Trash } from "react-bootstrap-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useFetch, type APIResponse } from "../../hooks/useFetch";
import Loading from "../../components/Loading";

function PatientsListPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filterPatientName, setFilterPatientName] = useState<string>("");
  const patientsApiResponse: APIResponse<Patient> = useFetch<Patient>("get", `${import.meta.env.VITE_API_URL}/patients`);
  useEffect(() => {
    if (!patientsApiResponse.loading && patientsApiResponse.data && Array.isArray(patientsApiResponse.data)) {
      setPatients(patientsApiResponse.data);
    }
  }, [patientsApiResponse]);
  
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterPatientName(event.target.value);
  };

  const handleDelete = async (event: React.MouseEvent, patientId: string) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/patients/${patientId}`);
    } catch (error) {
      console.log(error); //! Show something
    }
  }
  
  return (
    <div>
      {
        patientsApiResponse.loading ? <Loading /> :
          <>
            <h1 className="text-primary">Patient List</h1>
            <FloatingLabel label="Patient name" className="my-3" controlId="patientNameFilter">
              <Form.Control type="text" placeholder="Search patient" value={filterPatientName} onChange={handleOnChange} />
            </FloatingLabel>
            <ListGroup>
              {patients
                .filter(eachPatient => eachPatient.name.includes(filterPatientName))
                .map((patient) => (
                  (<ListGroup.Item action as={Link} to={`/patients/${patient.id}`} key={patient.id} className="d-flex justify-content-between align-items-center">
                  {patient.name}
                  <Button variant="danger" className="d-flex justify-content-between align-items-center" onClick={(event) => handleDelete(event, patient.id)}><Trash color="white" /></Button>
                </ListGroup.Item>)
              ))}
            </ListGroup>
          </>
      }
    </div>
  );
}
export default PatientsListPage;

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router"
import type { Patient, PatientTreatment, RemoteAPITreatment } from "../../types/types";
import axios from "axios";
import Loading from "../../components/Loading";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ListGroup from "react-bootstrap/ListGroup";
import { InfoSquareFill } from "react-bootstrap-icons";

type FormData = {
  treatmentName: string,
  needPrescription: "0" | "1" | ""
}

function NewTreatmentPage() {
  const [treatments, setTreatments] = useState<RemoteAPITreatment[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [selectedTreatments, setSelectedTreatments] = useState<PatientTreatment[]>([]);
  const [formData, setFormData] = useState<FormData>({treatmentName: "", needPrescription: ""});
  const { patientId } = useParams()
  const navigate = useNavigate();
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const getData = async () => {
    const ampersandNeeded = formData.treatmentName && formData.needPrescription;
    const nombreQuery = formData.treatmentName ? `nombre=${formData.treatmentName}` : "";
    console.log("Test", formData.needPrescription !== "" ? `receta=${formData.needPrescription}` : "");
    const recetaQuery = formData.needPrescription !== "" ? `receta=${formData.needPrescription}` : "";
    const query = `${nombreQuery}${ampersandNeeded ? "&" : ""}${recetaQuery}`;
    try {
      const response = await axios.get(`${import.meta.env.VITE_MEDS_API_URL}/medicamentos?${query}`);
      const responsePatient = await axios.get(`${import.meta.env.VITE_API_URL}/patients/${patientId}`);
      setTreatments(response.data.resultados);
      setPatient(responsePatient.data);
      setSelectedTreatments(responsePatient.data.treatments);
    } catch (error) {
      console.log(error); //! Do something
    }
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    console.log(event.target.value)
    setFormData(prevFormData => ({ ...prevFormData, [event.target.name]: event.target.value }))
  }

  if (!patient) {
    return <Loading />
  }

  const onSelectTreatment = (treatment: RemoteAPITreatment) => {
    setSelectedTreatments((prevSelected) => [...prevSelected, { name: treatment.nombre, id: treatment.nregistro }]);
  }

  const onUnselectTreatment = (index: number) => {
    setSelectedTreatments((prevSelected) => prevSelected.toSpliced(index, 1));
  }

  const handleOnAdd = async () => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/patients/${patientId}`, { treatments: selectedTreatments });
      console.log(response);
      navigate(-1);
    } catch (error) {
      console.log(error); //! Do something
    }
  }

  return (
    <div className="d-flex flex-column gap-2">
      <h1 onClick={() => navigate(-1)}>{patient.name}</h1>
      <Button onClick={handleOnAdd}>Add meds</Button>
      <Card>
        <Card.Body>
          <Form.Group as={Row} className="d-flex justify-content-between align-items-center">
            <Col xs={6}>
            <FloatingLabel label="Treatment name">
              <Form.Control name="treatmentName" type="text" value={formData.treatmentName} onChange={handleOnChange}></Form.Control>
            </FloatingLabel>
            </Col>
            <Col xs={6}>
              <FloatingLabel label="Needs prescription?">
                <Form.Select name="needPrescription" value={formData.needPrescription} onChange={handleOnChange}>
                  <option value="" selected></option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Form.Select>
              </FloatingLabel>
              {/* <Form.Check name="needPrescription" type="checkbox" label="Needs prescription?" checked={formData.needPrescription} onChange={handleOnChange}></Form.Check> */}
            </Col>
          </Form.Group>
        </Card.Body>
      </Card>
      {selectedTreatments.length > 0 &&
        <ListGroup>
          {selectedTreatments.map((treatment, index) => <ListGroup.Item variant="primary" action onClick={() => onUnselectTreatment(index)}>{treatment.name}</ListGroup.Item>)}
        </ListGroup>
      }
      {!treatments ? 
        <></> :
        <ListGroup>
          {treatments.map((treatment) => {
            return (
              <ListGroup.Item action onClick={() => onSelectTreatment(treatment)} className="d-flex align-items-center justify-content-center gap-1">
                <Link to={`/treatment-info/${treatment.nregistro}`}>
                  <InfoSquareFill size={16}/>
                </Link>
                {treatment.nombre}
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      }
    </div>
  )
}
export default NewTreatmentPage
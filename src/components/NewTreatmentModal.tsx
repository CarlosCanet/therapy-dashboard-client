import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ListGroup from "react-bootstrap/ListGroup";
import type { PatientTreatment, RemoteAPITreatment } from '../types/types';
import axios from 'axios';
import { Link } from 'react-router';
import { InfoSquareFill } from 'react-bootstrap-icons';

interface NewTreatmentModalProps {
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>,
  onAdd: (treatments: PatientTreatment[]) => void,
  patientTreatments: PatientTreatment[],
}

type FormData = {
  treatmentName: string,
  needPrescription: "0" | "1" | ""
}

function NewTreatmentModal({ show, setShow, onAdd, patientTreatments}: NewTreatmentModalProps) {
  const [treatments, setTreatments] = useState<RemoteAPITreatment[]>([]);
  const [selectedTreatments, setSelectedTreatments] = useState<PatientTreatment[]>(patientTreatments);
  const [formData, setFormData] = useState<FormData>({ treatmentName: "", needPrescription: "" });
  const [timeoutId, setTimeoutId] = useState<number>(0);
  
  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(0);
    } 
    setTimeoutId(setTimeout(getData, 500));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);
  
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prevFormData => ({ ...prevFormData, [event.target.name]: event.target.value }))
  }

  const handleClose = () => {
    setShow(false);
  }

  const handleOnAdd = () => {
    onAdd(selectedTreatments);
    setShow(false);
  }

  const onSelectTreatment = (treatment: RemoteAPITreatment) => {
    setSelectedTreatments((prevSelected) => [...prevSelected, { name: treatment.nombre, id: treatment.nregistro }]);
    setFormData({ treatmentName: "", needPrescription: "" });
  }

  const onUnselectTreatment = (index: number) => {
    setSelectedTreatments((prevSelected) => prevSelected.toSpliced(index, 1));
  }

  const getData = async () => {
    if (formData.treatmentName === "" && formData.needPrescription === "") {
      setTreatments([]);
      return;
    }
    
    const ampersandNeeded = formData.treatmentName && formData.needPrescription;
    const nombreQuery = formData.treatmentName ? `nombre=${formData.treatmentName}` : "";
    const recetaQuery = formData.needPrescription !== "" ? `receta=${formData.needPrescription}` : "";
    const query = `${nombreQuery}${ampersandNeeded ? "&" : ""}${recetaQuery}`;
    try {
      const response = await axios.get(`${import.meta.env.VITE_MEDS_API_URL}/medicamentos?${query}`);
      setTreatments(response.data.resultados);
    } catch (error) {
      console.log(error); //! Do something
    }
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add meds</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="d-flex justify-content-between align-items-center">
              <Col xs={6}>
              <FloatingLabel label="Treatment name">
                <Form.Control name="treatmentName" type="text" value={formData.treatmentName} onChange={handleOnChange}></Form.Control>
              </FloatingLabel>
              </Col>
              <Col xs={6}>
                <FloatingLabel label="Needs prescription?">
                  <Form.Select name="needPrescription" value={formData.needPrescription} onChange={handleOnChange} >
                    <option value=""></option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Form.Select>
                </FloatingLabel>
                {/* <Form.Check name="needPrescription" type="checkbox" label="Needs prescription?" checked={formData.needPrescription} onChange={handleOnChange}></Form.Check> */}
              </Col>
            </Form.Group>
        </Form>
        {selectedTreatments.length > 0 &&
        <ListGroup>
            {selectedTreatments.map((treatment, index) => <ListGroup.Item key={treatment.id} variant="primary" action onClick={() => onUnselectTreatment(index)}>{treatment.name}</ListGroup.Item>)}
        </ListGroup>
      }
      {!treatments ? 
        <></> :
        <ListGroup>
          {treatments.map((treatment) => {
            return (
              <ListGroup.Item action key={treatment.nregistro} onClick={() => onSelectTreatment(treatment)} className="d-flex align-items-center justify-content-center gap-1">
                <Link to={`/treatment-info/${treatment.nregistro}`}>
                  <InfoSquareFill size={16}/>
                </Link>
                {treatment.nombre}
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleOnAdd}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
  )
}
export default NewTreatmentModal;
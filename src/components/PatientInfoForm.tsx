import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { Genders, type Gender, type NewPatient, type Patient, type PatientTreatment } from "../types/types";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Badge } from "react-bootstrap";
import NewTreatmentModal from "./NewTreatmentModal";
import { dateToString } from "../utils/date";

interface FormDataInterface {
  name: string,
  dob: string,
  gender: Gender,
  issues: string[],
  treatments: {id: string, name: string}[],
  [key: string]: string | Date | string [] | Gender | {id: string, name: string}[];
}

type PatientInfoFormProps = { action: "add", onSubmit: (patient: NewPatient) => Promise<void> } | { action: "edit", onSubmit: (patient: Patient) => Promise<void>, patient: Patient };

function PatientInfoForm(props: PatientInfoFormProps) {
  const patient = props.action === "edit" ? props.patient : undefined;
  const { action, onSubmit } = props;
  const [formData, setFormData] = useState<FormDataInterface>({ name: patient?.name ?? "", dob: dateToString(patient?.dob ?? new Date()),  gender: patient?.gender ?? Genders.None, issues: patient?.issues ?? [], treatments: patient?.treatments ?? [] });
  const [showAddTreatmentModal, setShowAddTreatmentModal] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData(prevState => {
    return ({ ...prevState, [event.target.name]: event.target.value });
  })

  const handleOnChangeIssues = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index: number) => {
    const issues = [...formData.issues];
    issues[index] = event.target.value;
    setFormData(prevState => ({...prevState, issues}))
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (action === "add") {
      const newPatient: NewPatient = {
        name: formData.name,
        dob: new Date(formData.dob),
        gender: formData.gender,
        issues: formData.issues,
        activitiesPending: [],
        activitiesDone: [],
        treatments: [],
      };
      onSubmit(newPatient);
      console.log("Submiteado add")
    } else if (action === "edit" && patient) {
      const submittedPatient: Patient = {...formData, dob: new Date(formData.dob), id: patient.id, activitiesPending: patient.activitiesPending ?? [], activitiesDone: patient.activitiesDone ?? [], treatments: formData.treatments ?? [] };
      onSubmit(submittedPatient);
      console.log("Submiteado edit")
    }
    navigate(-1);
  }

  const handleOnAdd = (newTreatments: PatientTreatment[]) => setFormData(prevState => ({ ...prevState, treatments: newTreatments }));
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name"  placeholder="" value={formData.name} onChange={handleOnChange}></Form.Control>
      </Form.Group>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Date of birth</Form.Label>
        <Form.Control type="date" name="dob" placeholder="" value={formData.dob} onChange={handleOnChange}></Form.Control>
      </Form.Group>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Gender</Form.Label>
        {/* <Form.Control type="" placeholder="" value={formData.gender} onChange={handleOnChange}></Form.Control> */}
        <Form.Select aria-label="SELECT" name="gender" value={formData.gender} onChange={handleOnChange}>
          <option>Select gender</option>
          {Object.values(Genders).map(gender => <option key={gender} value={gender}>{gender}</option>)}
        </Form.Select>
      </Form.Group>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Issues</Form.Label>
      {patient?.issues.map((_issue, index) => {
        return (
            <Form.Control key={`issue${index}`} type="type" placeholder="" name={`issues[${index}]`} value={formData.issues[index]} onChange={(event) => handleOnChangeIssues(event, index)}></Form.Control>
          );
        })}
      </Form.Group>
      {action && action === "add" &&
        <Form.Group className="my-3" controlId="">
            <Form.Label>Issues</Form.Label>
            <Form.Control type="type" placeholder="" name="issues[0]" value={formData.issues[0]} onChange={handleOnChange}></Form.Control>
          </Form.Group>
      }
      {/* <ListGroup>
        <Form.Label>Treatments <Link to={`/patients/${patient?.id}/new-treatment`}><Badge bg="primary" pill>Add treatment</Badge></Link></Form.Label>
        {patient?.treatments.map((treatment, index) => <ListGroup.Item action as={Link} to={`/treatment-info/${treatment.id}`} key={index} className="mb-2">{treatment.name}</ListGroup.Item>)}
      </ListGroup> */}
      <ListGroup>
        <Form.Label>Treatments <Badge bg="primary" pill onClick={()=>setShowAddTreatmentModal(prevState => !prevState)}>Add treatment</Badge></Form.Label>
        {formData.treatments.map((treatment, index) => <ListGroup.Item action as={Link} to={`/treatment-info/${treatment.id}`} key={index} className="mb-2">{treatment.name}</ListGroup.Item>)}
        <NewTreatmentModal show={showAddTreatmentModal} setShow={setShowAddTreatmentModal} onAdd={handleOnAdd} patientTreatments={formData.treatments}/>
      </ListGroup>
      <Form.Group>
        <Button variant="secondary" type="submit">{action === "add" ? "New patient" : "Edit patient"}</Button>
        <Button variant="danger" onClick={() => navigate(-1)}>Back</Button>
      </Form.Group>
    </Form>
  )
}
export default PatientInfoForm;
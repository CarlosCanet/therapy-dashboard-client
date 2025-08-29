import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { Genders, type Gender, type NewPatient, type Patient, type PatientTreatment, type ToastInfo } from "../types/types";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Badge, Card } from "react-bootstrap";
import NewTreatmentModal from "./NewTreatmentModal";
import { dateToString } from "../utils/date";
import { DashCircle } from "react-bootstrap-icons";
import ToastMessage from "./ToastMessage";

interface FormDataInterface {
  name: string;
  dob: string;
  gender: Gender;
  issues: string[];
  treatments: { id: string; name: string }[];
  [key: string]: string | Date | string[] | Gender | { id: string; name: string }[];
}

type PatientInfoFormProps = { action: "add"; onSubmit: (patient: NewPatient) => Promise<void> } | { action: "edit"; onSubmit: (patient: Patient) => Promise<void>; patient: Patient };

function filterEmptyIssues(issues: string[]) {
  return issues.filter(issue => issue.length > 0);
}

function PatientInfoForm(props: PatientInfoFormProps) {
  const patient = props.action === "edit" ? props.patient : undefined;
  const { action, onSubmit } = props;
  const [formData, setFormData] = useState<FormDataInterface>({
    name: patient?.name ?? "",
    dob: dateToString(patient?.dob ?? new Date()),
    gender: patient?.gender ?? Genders.None,
    issues: [...(patient?.issues ?? []), ""],
    treatments: patient?.treatments ?? [],
  });
  const [showAddTreatmentModal, setShowAddTreatmentModal] = useState(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastInfo, setToastInfo] = useState<ToastInfo>({variant:"", message: ""});
  const navigate = useNavigate();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });

  const handleOnChangeIssues = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, index: number) => {
    const updatedIssues = [...formData.issues];
    updatedIssues[index] = event.target.value;
    if (index === formData.issues.length - 1) {
      updatedIssues.push("");
    }
    setFormData((prevState) => ({ ...prevState, issues: updatedIssues }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (action === "add") {
        const newPatient: NewPatient = {
          name: formData.name,
          dob: new Date(formData.dob),
          gender: formData.gender,
          issues: filterEmptyIssues(formData.issues),
          activitiesPending: [],
          activitiesDone: [],
          treatments: [],
        };
        await onSubmit(newPatient);
      } else if (action === "edit" && patient) {
        const submittedPatient: Patient = { ...formData, dob: new Date(formData.dob), id: patient.id, activitiesPending: patient.activitiesPending ?? [], activitiesDone: patient.activitiesDone ?? [], treatments: formData.treatments ?? [], issues: filterEmptyIssues(formData.issues) };
        await onSubmit(submittedPatient);
      }
      setShowToast(true);
      navigate("/patients");
    } catch (error) {
      setToastInfo(action === "add" ? {message: "Something went wrong adding the patient", variant: "danger"} : {message: "Something went wrong editing the patient", variant: "danger"});
      console.error("Error editing/adding the patient:", error);
      setShowToast(true);
    }
  };

  const handleOnAdd = (newTreatments: PatientTreatment[]) => setFormData((prevState) => ({ ...prevState, treatments: newTreatments }));

  // const handleAddNewIssue = () => {
  //   setFormData(prevState => {
  //     const newIssues = [...prevState.issues];
  //     newIssues.push("");
  //     return { ...prevState, issues: newIssues};
  //   });
  // }

  const handleDeleteIssue = (index: number) => {
    setFormData(prevState => {
      const updatedIssues = prevState.issues.toSpliced(index, 1);
      return ({ ...prevState, issues: updatedIssues.length > 0 ? updatedIssues : [""] });
    });
  }

  return (
    <Card className="mt-3 bg-light" border="secondary">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-3" controlId="">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="" value={formData.name} onChange={handleOnChange} required />
          </Form.Group>
          <Form.Group className="my-3 " controlId="">
            <Form.Label className="d-flex align-items-center justify-content-center gap-2">Date of birth {formData.dob && <Badge pill bg="secondary" text="dark" className="px-3">{(new Date().getFullYear())- (new Date(formData.dob).getFullYear())} años</Badge>}</Form.Label>
            <Form.Control type="date" name="dob" placeholder="" value={formData.dob} onChange={handleOnChange} />
          </Form.Group>
          <Form.Group className="my-3" controlId="">
            <Form.Label>Gender</Form.Label>
            {/* <Form.Control type="" placeholder="" value={formData.gender} onChange={handleOnChange} /> */}
            <Form.Select aria-label="SELECT" name="gender" value={formData.gender} onChange={handleOnChange}>
              <option>Select gender</option>
              {Object.values(Genders).map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="my-3 d-flex flex-column gap-2" controlId="">
            <Form.Label>Issues</Form.Label>
            {formData.issues.map((_issue, index) => {
              return (
                <Form.Group className="d-flex align-items-center gap-2" key={`issue${index}`}>
                    <Form.Control type="type" placeholder="" name={`issues[${index}]`} value={formData.issues[index]} onChange={(event) => handleOnChangeIssues(event, index)} />
                    <DashCircle className={`plus-icon ${(index === (formData.issues.length - 1)) ? "hidden" : ""}`} onClick={() => handleDeleteIssue(index)} />
                  </Form.Group>
                );
              })
            }
          </Form.Group>
          <ListGroup>
            <Form.Label>
              Treatments{" "}
              <Badge bg="primary" pill onClick={() => setShowAddTreatmentModal((prevState) => !prevState)}>
                Add treatment
              </Badge>
            </Form.Label>
            {formData.treatments.map((treatment, index) => (
              <ListGroup.Item action as={Link} to={`/treatment-info/${treatment.id}`} key={index} className="mb-2">
                {treatment.name}
              </ListGroup.Item>
            ))}
            <NewTreatmentModal show={showAddTreatmentModal} setShow={setShowAddTreatmentModal} onAdd={handleOnAdd} patientTreatments={formData.treatments} />
          </ListGroup>
          <Form.Group className="d-flex justify-content-center gap-4">
            <Button variant="secondary" type="submit">
              {action === "add" ? "New patient" : "Edit patient"}
            </Button>
            <Button variant="danger" onClick={() => navigate(-1)}>
              Back
            </Button>
          </Form.Group>
        </Form>
        <ToastMessage variant={toastInfo.variant} message={toastInfo.message} delay={5000} show={showToast} setShow={setShowToast}/>
      </Card.Body>
    </Card>
  );
}
export default PatientInfoForm;

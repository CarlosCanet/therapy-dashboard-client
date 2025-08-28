import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { type NewSession, type Session } from "../types/types";
import { useState } from "react";
import { useNavigate } from "react-router";
import { dateToString } from "../utils/date";

interface FormDataInterface {
  date: string,
  description: string,
  problems: string,
  // activitiesReviewed: Activity[],
  // activitiesProposed: Activity[],
  // treatmentInfo: TreatmentInfo,
  // [key: string]: Date | string | Activity[] | TreatmentInfo;
  [key: string]: string;
}

type SessionInfoFormProps = { action: "add", onSubmit: (session: NewSession) => Promise<void>, patientId: string } | { action: "edit", onSubmit: (session: Session) => Promise<void>, session: Session };

function SessionInfoForm(props: SessionInfoFormProps) {
  const session = props.action === "edit" ? props.session : undefined;
  const { action, onSubmit } = props;
  const [formData, setFormData] = useState<FormDataInterface>({ date: dateToString(session?.date), description: session?.description ?? "", problems: session?.problems ?? "" });
  const navigate = useNavigate();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData(prevState => {
    // console.log(event.target.value);
    // console.log({ ...prevState, [event.target.name]: (event.target.type === "date" ? new Date(event.target.value) : event.target.value) })
    return ({ ...prevState, [event.target.name]: (event.target.type === "date" ? dateToString(new Date(event.target.value)) : event.target.value) });
  })
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (action === "add" && props.patientId) {
      const newSession: NewSession = {
        patientId: props.patientId,
        description: formData.description,
        date: new Date(formData.date),
        problems: formData.problems
      };
      onSubmit(newSession);
      console.log("Submiteado add")
    } else if (action === "edit" && session) {
      const submittedSession = {...formData, date: new Date(formData.date), patientId: session.patientId, id: session.id };
      onSubmit(submittedSession);
      console.log("Submiteado edit")
    }
    navigate(-1);
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description"  placeholder="" value={formData.description} onChange={handleOnChange}></Form.Control>
      </Form.Group>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" name="date" placeholder="" value={formData.date} onChange={handleOnChange}></Form.Control>
      </Form.Group>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Problems</Form.Label>
        <Form.Control type="text" name="problems" placeholder="" value={formData.problems} onChange={handleOnChange}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Button variant="secondary" type="submit">{action === "add" ? "New session" : "Edit session"}</Button>
        <Button variant="danger" onClick={() => navigate(-1)}>Back</Button>
      </Form.Group>
    </Form>
  )
}
export default SessionInfoForm;
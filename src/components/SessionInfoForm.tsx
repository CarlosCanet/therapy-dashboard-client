import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { type Session } from "../types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { dateToString } from "../utils/dateUtils";

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

interface SessionInfoFormProps {
  action: "add" | "edit",
  onSubmit: (session: Session) => void
  session?: Session,
}

function SessionInfoForm({ action, onSubmit, session }: SessionInfoFormProps) {
  const [formData, setFormData] = useState<FormDataInterface>({ date: dateToString(session?.date), description: session?.description ?? "", problems: session?.problems ?? "" });
  const navigate = useNavigate();
  useEffect(() => {
    console.log(session)
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData(prevState => {
    // console.log(event.target.value);
    // console.log({ ...prevState, [event.target.name]: (event.target.type === "date" ? new Date(event.target.value) : event.target.value) })
    return ({ ...prevState, [event.target.name]: (event.target.type === "date" ? dateToString(new Date(event.target.value)) : event.target.value) });
  })
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (action === "add") {
      const newSession: Session = {
        patientId: session?.patientId ?? "",    //!!! GESTIONAR PATIENT_ID
        description: formData.description,
        date: new Date(formData.date),
        problems: formData.problems
        
      };
      onSubmit(newSession);
      console.log("Submiteado add")
    } else if (action === "edit" && session) {
      const submittedSession = {...formData, date: new Date(formData.date), patientId: session.patientId };
      onSubmit(submittedSession);
      console.log("Submiteado edit")
    }
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
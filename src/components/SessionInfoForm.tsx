import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { type NewSession, type Session, type ToastInfo } from "../types/types";
import { useState } from "react";
import { useNavigate } from "react-router";
import { dateToString } from "../utils/date";
import ToastMessage from "./ToastMessage";

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
  const [formData, setFormData] = useState<FormDataInterface>({ date: dateToString(session?.date ?? new Date()), description: session?.description ?? "", problems: session?.problems ?? "" });
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastInfo, setToastInfo] = useState<ToastInfo>({variant:"", message: ""});
  const navigate = useNavigate();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData(prevState => {
    return ({ ...prevState, [event.target.name]: (event.target.type === "date" ? dateToString(new Date(event.target.value)) : event.target.value) });
  })
  
  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      if (action === "add" && props.patientId) {
        const newSession: NewSession = {
          patientId: props.patientId,
          description: formData.description,
          date: new Date(formData.date),
          problems: formData.problems,
          activitiesReviewed: [],
          activitiesProposed: []
        };
        await onSubmit(newSession);
      } else if (action === "edit" && session) {
        const submittedSession = {...formData, date: new Date(formData.date), patientId: session.patientId, id: session.id, activitiesReviewed: [], activitiesProposed: [] };
        await onSubmit(submittedSession);
      }
      navigate(-1);
    } catch (error) {
      console.error("Error editing/adding the session:", error);
      setToastInfo(action === "add" ? {message: "Something went wrong adding the session", variant: "danger"} : {message: "Something went wrong editing the session", variant: "danger"});
      setShowToast(true);
    }
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" as="textarea" name="description"  placeholder="" value={formData.description} onChange={handleOnChange} />
      </Form.Group>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" name="date" placeholder="" value={formData.date} onChange={handleOnChange} required />
      </Form.Group>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Problems</Form.Label>
        <Form.Control type="text" as="textarea" name="problems" placeholder="" value={formData.problems} onChange={handleOnChange} />
      </Form.Group>
      <Form.Group className="d-flex justify-content-center gap-4">
        <Button variant="secondary" type="submit">{action === "add" ? "New session" : "Edit session"}</Button>
        <Button variant="danger" onClick={() => navigate(-1)}>Back</Button>
      </Form.Group>
      <ToastMessage variant={toastInfo.variant} message={toastInfo.message} delay={5000} show={showToast} setShow={setShowToast}/>
    </Form>
  )
}
export default SessionInfoForm;
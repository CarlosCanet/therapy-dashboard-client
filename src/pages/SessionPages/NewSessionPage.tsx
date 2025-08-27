import axios from "axios";
import type { Session } from "../../types/types";
import SessionInfoForm from "../../components/SessionInfoForm";
import { useParams } from "react-router";

function NewSessionPage() {
  const { patientId } = useParams();
  const onAdd = async (session: Session) => {
    try {
      console.log("New session:", session);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/sessions/`, session);
      console.log("Post response:", response);
    } catch (error) {
      console.log(error); //! It should display something
    }
  }

  return (
    <SessionInfoForm action="add" onSubmit={onAdd} patientId={patientId} />
  )
}
export default NewSessionPage
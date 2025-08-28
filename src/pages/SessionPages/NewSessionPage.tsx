import axios from "axios";
import type { NewSession } from "../../types/types";
import SessionInfoForm from "../../components/SessionInfoForm";
import { useParams } from "react-router";
import ErrorCard from "../../components/ErrorCard";
import { dateToString } from "../../utils/date";

function NewSessionPage() {
  const { patientId } = useParams();
  const onAdd = async (session: NewSession) => {
    try {
      console.log("New session:", session);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/sessions/`, {...session, date: dateToString(session.date)});
      console.log("Post response:", response);
    } catch (error) {
      console.log(error); //! It should display something
    }
  }

  if (!patientId) {
    return <ErrorCard />
  }

  return (
    <SessionInfoForm action="add" onSubmit={onAdd} patientId={patientId} />
  )
}
export default NewSessionPage
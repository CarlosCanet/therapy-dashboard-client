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
      await axios.post(`${import.meta.env.VITE_API_URL}/sessions/`, {...session, date: dateToString(session.date)});
    } catch (error) {
      console.error("Error creating the session:", error);
      throw new Error("API not responding");
    }
  }

  if (!patientId) {
    return <ErrorCard />
  }

  return (
    <SessionInfoForm action="add" onSubmit={onAdd} patientId={patientId} />
  )
}
export default NewSessionPage;
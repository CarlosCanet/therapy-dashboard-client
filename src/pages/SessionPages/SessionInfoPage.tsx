import { Link, useParams } from "react-router"
import type { Session, SessionWithPatient } from "../../types/types";
import { useFetch, type APIResponse } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import ErrorCard from "../../components/ErrorCard";
import SessionInfoForm from "../../components/SessionInfoForm";
import { transformSessionWithPatient } from "../../utils/api";
import axios from "axios";
import { dateToDisplay, dateToString } from "../../utils/date";

function SessionInfoPage() {
  const [session, setSession] = useState<SessionWithPatient | null>(null);
  const { sessionId } = useParams();
  const sessionApiResponse: APIResponse<SessionWithPatient> = useFetch<SessionWithPatient>("get", `${import.meta.env.VITE_API_URL}/sessions/${sessionId}?_expand=patient`, transformSessionWithPatient);
  useEffect(() => {
     if (!sessionApiResponse.loading && sessionApiResponse.data && !Array.isArray(sessionApiResponse.data)) {
       setSession(sessionApiResponse.data);
    }
  }, [sessionApiResponse]);

  if (sessionApiResponse.loading || !sessionApiResponse.data) {
    return <Loading />
  }
  if (!session) {
    return <ErrorCard />
  }

  const onEdit = async (session: Session) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`, {...session, date: dateToString(session.date)});
    } catch (error) {
      console.error("Error editing the session:", error);
      throw new Error("API not responding");
    }
  }

  return (
    <div>
      <Link to={`/patients/${session.patientId}`} className="link-primary link-underline-opacity-0">
        <h1>{session.patient && `${session.patient.name} - `} {dateToDisplay(session.date)}</h1>
      </Link>
      <SessionInfoForm action="edit" onSubmit={onEdit} session={session}/>
    </div>
  )
}
export default SessionInfoPage
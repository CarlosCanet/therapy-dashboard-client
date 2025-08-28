import { useParams } from "react-router"
import type { NewSession, Session } from "../../types/types";
import { useFetch, type APIResponse } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import ErrorCard from "../../components/ErrorCard";
import SessionInfoForm from "../../components/SessionInfoForm";
import { dateToString } from "../../utils/date";
import { transformDataFetchWithDate } from "../../utils/api";
import axios from "axios";

function SessionInfoPage() {
  const [session, setSession] = useState<Session | null>(null);
  const { sessionId } = useParams();
  const sessionApiResponse: APIResponse<Session> = useFetch<Session>("get", `${import.meta.env.VITE_API_URL}/sessions/${sessionId}?_expand=patient`, transformDataFetchWithDate);
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

  const onEdit = async (session: Session | NewSession) => {
    console.log(session);
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/sessions/${sessionId}`, session);
      console.log(response)
    } catch (error) {
      console.log(error); //! It should display something
    }
  }

  return (
    <div>
      <h1>{session.patient && `${session.patient.name} - `} {dateToString(session.date)}</h1>
      <SessionInfoForm action="edit" onSubmit={onEdit} session={session}/>
    </div>
  )
}
export default SessionInfoPage
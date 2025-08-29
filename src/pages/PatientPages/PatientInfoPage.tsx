import type { NewPatient, Patient, PatientWithSessions } from "../../types/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useFetch, type APIResponse } from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import ErrorCard from "../../components/ErrorCard";
import PatientInfoForm from "../../components/PatientInfoForm";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import SessionList from "../../components/SessionList";
import { transformPatientWithSessions } from "../../utils/api";
import { dateToString } from "../../utils/date";

function PatientInfoPage() {
  const [patient, setPatient] = useState<PatientWithSessions | null>(null);
  const { patientId } = useParams();
  const patientApiResponse: APIResponse<PatientWithSessions> = useFetch<PatientWithSessions>("get", `${import.meta.env.VITE_API_URL}/patients/${patientId}?_embed=sessions`, transformPatientWithSessions);
  useEffect(() => {
     if (!patientApiResponse.loading && patientApiResponse.data && !Array.isArray(patientApiResponse.data)) {
      setPatient(patientApiResponse.data);
    }
  }, [patientApiResponse]);

  if (patientApiResponse.loading || !patientApiResponse.data) {
    return <Loading />
  }
  if (!patient) {
    return <ErrorCard />
  }

  const onEdit = async (patient: Patient | NewPatient) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/patients/${patientId}`, {...patient, dob: dateToString(patient.dob)});
    } catch (error) {
      console.log(error); //! It should display something
    }
  }
  
  return (
    <div>
      <h1 className="text-primary">{patient.name}</h1>
      <PatientInfoForm patient={patient} action="edit" onSubmit={onEdit} />
      <h2 className="mt-4 text-primary">Sessions</h2>
      
      <Link to={`/patients/${patient.id}/new-session`}>
        <Badge className="mb-3">Add new Session</Badge>
      </Link>
      
      <SessionList sessions={patient.sessions ?? []}/>
    </div>
  )
}
export default PatientInfoPage
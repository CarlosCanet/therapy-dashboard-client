import type { Patient } from "../../types/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useFetch, type APIResponse } from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import ErrorCard from "../../components/ErrorCard";
import PatientInfoForm from "../../components/PatientInfoForm";
import axios from "axios";
import Badge from "react-bootstrap/Badge";
import SessionList from "../../components/SessionList";
import { transformDataFetchWithDate } from "../../utils/apiUtils";


function PatientInfoPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { patientId } = useParams();
  const patientApiResponse: APIResponse<Patient> = useFetch<Patient>("get", `${import.meta.env.VITE_API_URL}/patients/${patientId}?_embed=sessions`, transformDataFetchWithDate);
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

  const onEdit = async (patient: Patient) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/patients/${patientId}`, patient);
      console.log("Patch response:", response);
    } catch (error) {
      console.log(error); //! It should display something
    }
  }
  
  return (
    <div>
      <h1>{patient.name}</h1>
      <PatientInfoForm patient={patient} action="edit" onSubmit={onEdit} />
      <h2 className="my-4">Sessions</h2>
      
      <Link to={"/new-session"}>
        <Badge className="my-1">Add new Session</Badge>
      </Link>
      <SessionList sessions={patient.sessions ?? []}/>
    </div>
  )
}
export default PatientInfoPage
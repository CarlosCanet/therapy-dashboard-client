import type { Patient } from "../../types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetch, type APIResponse } from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import ErrorCard from "../../components/ErrorCard";
import PatientInfoForm from "../../components/PatientInfoForm";


function PatientInfoPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { patientId } = useParams();
  const patientApiResponse: APIResponse<Patient> = useFetch<Patient>(`${import.meta.env.VITE_API_URL}/patients/${patientId}`);
  useEffect(() => {
     if (!patientApiResponse.loading && patientApiResponse.data) {
      setPatient(patientApiResponse.data);
    }
  }, [patientApiResponse]);

  if (patientApiResponse.loading || !patientApiResponse.data) {
    return <Loading />
  }
  if (!patient) {
    return <ErrorCard />
  }
  
  return (
    <div>
      <h1>{patient.name}</h1>
      <PatientInfoForm patient={patient}/>
    </div>
  )
}
export default PatientInfoPage
import type { Patient } from "../../types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetch, type APIResponse } from "../../hooks/useFetch";
import Loading from "../../components/Loading";
import ErrorCard from "../../components/ErrorCard";
import PatientInfoForm from "../../components/PatientInfoForm";
import axios from "axios";


function PatientInfoPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { patientId } = useParams();
  const patientApiResponse: APIResponse<Patient> = useFetch<Patient>("get", `${import.meta.env.VITE_API_URL}/patients/${patientId}`);
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
      <PatientInfoForm patient={patient} action="edit" onSubmit={onEdit}/>
    </div>
  )
}
export default PatientInfoPage
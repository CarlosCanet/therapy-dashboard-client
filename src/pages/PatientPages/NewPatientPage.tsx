import axios from "axios";
import PatientInfoForm from "../../components/PatientInfoForm"
import type { NewPatient } from "../../types/types";
import { dateToString } from "../../utils/date";

function NewPatientPage() {
  const onAdd = async (patient: NewPatient) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/patients`, {...patient, dob: dateToString(patient.dob)});
    } catch (error) {
      console.error("Error creating the patient:", error);
      throw new Error("API not responding");
    }
  }

  return (
      <PatientInfoForm action="add" onSubmit={onAdd} />
  )
}
export default NewPatientPage
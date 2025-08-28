import axios from "axios";
import PatientInfoForm from "../../components/PatientInfoForm"
import type { NewPatient } from "../../types/types";

function NewPatientPage() {

  const onAdd = async (patient: NewPatient) => {
    try {
      console.log("New patient:", patient);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/patients`, patient);
      console.log("Post response:", response);
    } catch (error) {
      console.log(error); //! It should display something
    }
  }

  return (
    <PatientInfoForm action="add" onSubmit={onAdd}/>
  )
}
export default NewPatientPage
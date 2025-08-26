import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Genders, type Gender, type Patient } from "../types/types";
import { useState } from "react";

interface FormDataInterface {
  name: string,
  age: number,
  gender: Gender,  
  issues: string[]
  [key: string]: string | number | string [] | Gender;
}

interface PatientInfoFormProps {
  patient?: Patient,
  action?: string,
  onSubmit?: (event: string) => void
}

function PatientInfoForm({ patient, action }: PatientInfoFormProps) {
  const [formData, setFormData] = useState<FormDataInterface>({ name: patient?.name ?? "", age: patient?.age ?? 0, gender: patient?.gender ?? Genders.None, issues: patient?.issues ?? [] });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setFormData(prevState => {
    console.log({ ...prevState, [event.target.name]: event.target.value });
    if (event.target.name.includes("[")) {
      const [key, indexStr] = event.target.name.split("[");
      const index = parseInt(indexStr);
      const prevArr = Array.isArray(prevState[key]) ? [...prevState[key]] : [];
      prevArr[index] = event.target.value;
      return ({ ...prevState, [key]: prevArr });
    }
    return ({ ...prevState, [event.target.name]: event.target.value });
  })
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Submiteado")
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name"  placeholder="" value={formData.name} onChange={handleOnChange}></Form.Control>
      </Form.Group>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Age</Form.Label>
        <Form.Control type="number" name="age" placeholder="" value={formData.age} onChange={handleOnChange}></Form.Control>
      </Form.Group>
      <Form.Group className="my-3" controlId="">
        <Form.Label>Gender</Form.Label>
        {/* <Form.Control type="" placeholder="" value={formData.gender} onChange={handleOnChange}></Form.Control> */}
        <Form.Select aria-label="SELECT" name="gender" value={formData.gender} onChange={handleOnChange}>
          <option>Select gender</option>
          {Object.values(Genders).map(gender => <option key={gender} value={gender}>{gender}</option>)}
        </Form.Select>
      </Form.Group>
      {patient?.issues.map((issue, index) => {
        return (
          <Form.Group className="my-3" controlId="" key={`issue${index}`}>
            <Form.Label>Issues</Form.Label>
            <Form.Control type="type" placeholder="" name={`issues[${index}]`} value={formData.issues[index]} onChange={handleOnChange}></Form.Control>
          </Form.Group>
        );
      })}
      {action && action === "add" &&
        <Form.Group className="my-3" controlId="">
            <Form.Label>Issues</Form.Label>
            <Form.Control type="type" placeholder="" name="issues[0]" value={formData.issues[0]} onChange={handleOnChange}></Form.Control>
          </Form.Group>
      }
      <Button variant="secondary" type="submit">Submit</Button>
    </Form>
  )
}
export default PatientInfoForm;
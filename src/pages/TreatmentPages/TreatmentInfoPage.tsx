import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { TreatmentInfo } from "../../types/types";
import Loading from "../../components/Loading";
import Card from "react-bootstrap/Card";
import { Circle, PatchCheckFill } from "react-bootstrap-icons";

interface RemoteAPIMedicament {
  nregistro: string,
  nombre: string,
  labtitular: string,
  pactivos: string,
  receta: boolean,
  generico: boolean,
  fotos: {tipo: string, url: string, fecha: string}[],
  docs: {tipo: string, url: string, urlHtml:string, fecha: string}[],
  viasAdministracion: {id: string, nombre: string}[],
  formaFarmaceuticaSimplificada: {id: string, nombre: string},
  dosis: string
}

function TreatmentInfoPage() {
  const [treatmentInfo, setTreatmentInfo] = useState<TreatmentInfo>({
    id: "",
    name: "",
    labName: "",
    activePrinciples: "",
    needPrescription: false,
    isGeneric: true,
    treatmentImageURL: "",
    boxImageURL: "",
    technichalDocURL: "",
    leafletURL: "",
    administration: "",
    pharmaForm: "",
    dosage: ""
  });
  const [loading, setLoading] = useState(true);
  const { treatmentId } = useParams();
  useEffect(() => {
    getData();
  }, []);
  
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://cima.aemps.es/cima/rest/medicamento?nregistro=${treatmentId}`);
      const treatment: RemoteAPIMedicament = response.data;
      console.log("T", treatment)
      console.log(response);
      setTreatmentInfo({
        id: treatment.nregistro,
        name: treatment.nombre,
        labName: treatment.labtitular,
        activePrinciples: treatment.pactivos,
        needPrescription: treatment.receta,
        isGeneric: treatment.generico,
        treatmentImageURL: treatment.fotos[1].url,
        boxImageURL: treatment.fotos[0].url,
        technichalDocURL: treatment.docs[0].url,
        leafletURL: treatment.docs[1].url,
        administration: treatment.viasAdministracion.map((via: {id:string, nombre:string}) => via.nombre).join(","),
        pharmaForm: treatment.formaFarmaceuticaSimplificada.nombre,
        dosage: treatment.dosis
      });
      console.log("HEY!")
      setLoading(false);
    } catch (error) {
      console.log(error); //! Do something!
    }
  };

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{treatmentInfo.name}</Card.Title>
          <Card.Subtitle>{treatmentInfo.activePrinciples}</Card.Subtitle>
          <Card.Img variant="top" src={treatmentInfo.boxImageURL} alt={`${treatmentInfo.name} box picture`} />
          <Card.Text>{treatmentInfo.labName}</Card.Text>
          <Card.Text>{treatmentInfo.activePrinciples}</Card.Text>
          <div className="d-flex justify-content-evenly">
            <Card.Text className="d-flex align-items-center">Needs prescription? {treatmentInfo.needPrescription ? <PatchCheckFill /> : <Circle />}</Card.Text>
            <Card.Text>Is generic? {treatmentInfo.isGeneric ? <PatchCheckFill /> : <Circle />}</Card.Text>
          </div>
          <Card>
            <Card.Body>
              <Card.Title>Pills</Card.Title>
              <Card.Img variant="bottom" src={treatmentInfo.treatmentImageURL} alt={`${treatmentInfo.name} picture`} />
              <Card.Text>Routes of administration: {treatmentInfo.administration}</Card.Text>
            </Card.Body>
          </Card>
          <Card.Link href={treatmentInfo.leafletURL}>Leaflet</Card.Link>
          <Card.Link href={treatmentInfo.technichalDocURL}>Technical doc</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}
export default TreatmentInfoPage;

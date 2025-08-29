import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BeatLoader, CircleLoader, DotLoader, GridLoader, HashLoader, PulseLoader, RiseLoader, RotateLoader } from "react-spinners";

function Loading() {
  const [spinner, setSpinner] = useState<number>(0);

  useEffect(() => {
    setSpinner(Math.floor(Math.random() * 8));
  }, []);
  const spinnerComponent = () => {
    switch (spinner) {
      case 0:
        return <BeatLoader color="var(--bs-primary)" size={30} />;
      case 1:
        return <CircleLoader color="var(--bs-primary)" size={30} />;
      case 2:
        return <DotLoader color="var(--bs-primary)" size={30} />;
      case 3:
        return <GridLoader color="var(--bs-primary)" size={30} />;
      case 4:
        return <HashLoader color="var(--bs-primary)" size={30} />;
      case 5:
        return <PulseLoader color="var(--bs-primary)" size={30} />;
      case 6:
        return <RiseLoader color="var(--bs-primary)" size={30} />;
      case 7:
        return <RotateLoader color="var(--bs-primary)" size={30} />;
    }
  };
  return (
    <Card>
      <Card.Header as={"h3"} className="bg-primary text-secondary py-4">Loading...</Card.Header>
      <Card.Body className="d-flex text-center justify-content-center align-items-center">
        {<Card.Text className="text-center py-5">{spinnerComponent()}</Card.Text>}
      </Card.Body>
      <Card.Footer className="bg-primary text-secondary py-3">Sometimes this can take up to 1 minute...</Card.Footer>
    </Card>
  );
}
export default Loading;

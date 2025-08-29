import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <>
      <h1 className="my-3">Loading...</h1>
      <Spinner animation="grow" variant="primary" />
    </>
  )
}
export default Loading;
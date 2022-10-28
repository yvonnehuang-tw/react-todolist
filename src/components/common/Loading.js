import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div className="loading-content">
      <Spinner animation="border" className="loading-size">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

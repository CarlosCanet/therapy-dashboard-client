import { type Dispatch, type SetStateAction } from 'react';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';

interface ToastMessageProps {
  variant: string;
  message: string;
  delay: number;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

function ToastMessage({ variant, message, delay, show, setShow }: ToastMessageProps) {
  return (
    <Row className='d-flex justify-content-end'>
      <Toast bg={variant} onClose={() => setShow(false)} show={show} delay={delay} autohide className='m-3 text-white'>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </Row>
  );
}
export default ToastMessage
import { type Dispatch, type SetStateAction } from 'react';
import Toast from 'react-bootstrap/Toast';

interface ToastMessageProps {
  variant: string;
  message: string;
  delay: number;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

function ToastMessage({ variant, message, delay, show, setShow }: ToastMessageProps) {
  return (
    <Toast bg={variant} onClose={() => setShow(false)} show={show} delay={delay} autohide>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
export default ToastMessage
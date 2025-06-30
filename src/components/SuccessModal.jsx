import { useModals } from "../store/ModalContext";
import Modal from "../UI/Modal";

function SuccessModal() {
  const { refs } = useModals()
  return (
    <Modal ref={refs.successModalRef} >
      <h3>Success!</h3>
      <p>Your order was submitted successfully.</p>
      <p>
        We will get back to you with more details via email within the next few
        minutes
      </p>
      <form method="dialog">
        <button className="button">Okay</button>
      </form>
    </Modal>
  );
};

export default SuccessModal;

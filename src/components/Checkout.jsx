import { useContext } from "react";
import Modal from "../UI/Modal";
import Input from "./Input";
import { postOrder } from "../http";
import CartContext from "../store/CartContext";
import { useModals } from "../store/ModalContext";

function Checkout() {
  const { refs, actions } = useModals();
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const orderData = {
      order: {
        items: cartCtx.items,
        customer: data,
      },
    };
    try {
      const message = await postOrder(orderData);
      if(message) {
        actions.openSuccessModal()
      }
    } catch (error) {
      console.log(error.message)
    }

    // ref.current.close();
  }

  return (
    <Modal className="control" ref={refs.checkoutModalRef}>
      <h3>Checkout</h3>
      <p>Total Amount ${totalPrice}</p>
      <form onSubmit={handleSubmit}>
        <Input name="name" label="Full Name" inputType="text" />
        <Input name="email" label="E-Mail Address" inputType="email" />
        <Input name="street" label="Street" inputType="text" />

        <div className="control-row">
          <Input name="postal-code" label="Postal Code" inputType="text" />
          <Input name="city" label="City" inputType="text" />
        </div>
        <div className="modal-actions">
          <button
            className="text-button"
            type="reset"
            onClick={() => refs.checkoutModalRef.current?.close()}
          >
            Close
          </button>
          <button className="button" type="submit">
            Submit Order
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Checkout;

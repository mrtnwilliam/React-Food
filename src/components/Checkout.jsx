import { forwardRef } from "react";
import Modal from "./Modal";
import Input from "./Input";
import { postOrder } from "../http";

const Checkout = forwardRef(function Checkout({ cart , handleSuccess }, ref) {
  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    console.log(data)

    const orderData = {
      order: {
        items: cart.meals,
        customer: data,
      },
    };
    try {
      const message = await postOrder(orderData);
      if(message) {
        handleSuccess()
      }
    } catch (error) {
      console.log(error.message)
    }

    ref.current.close();
  }

  return (
    <Modal className="control" ref={ref}>
      <h3>Checkout</h3>
      <p>Total Amount ${cart.totalPrice}</p>
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
            onClick={() => ref.current.close}
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
});

export default Checkout;

import { forwardRef } from "react";
import Modal from "./Modal";

const CartModal = forwardRef(function CartModal({ cart , updateItemQuantity , handleClick }, ref) {
  return (
    <Modal className="cart" ref={ref}>
      <h2>Your Cart</h2>
      <ul>
        {cart.meals.map((item) => (
          <li key={item.id} className="cart-item">
            <p>
              {item.name} - {item.quantity} x ${item.price}
            </p>
            <p className="cart-item-actions">
              <button onClick={() => updateItemQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateItemQuantity(item.id, 1)}>+</button>
            </p>
          </li>
        ))}
      </ul>
      <div className="cart-total">${cart.totalPrice}</div>
      <form className="modal-actions" method="dialog">
        <button className="text-button">Close</button>
        <button className="button" onClick={handleClick}>Go to Checkout</button>
      </form>
    </Modal>
  );
});

export default CartModal;

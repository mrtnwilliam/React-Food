import { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import { useModals } from "../store/ModalContext";

function CartModal() {
  const { refs, actions } = useModals();
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Modal className="cart" ref={refs.cartModalref}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id} className="cart-item">
            <p>
              {item.name} - {item.quantity} x ${item.price}
            </p>
            <p className="cart-item-actions">
              <button onClick={() => cartCtx.removeItem(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => cartCtx.addItem(item)}>+</button>
            </p>
          </li>
        ))}
      </ul>
      <div className="cart-total">${totalPrice}</div>
      <form className="modal-actions" method="dialog">
        <button className="text-button">Close</button>
        <button
          className="button"
          onClick={actions.openCheckoutModal}
          disabled={cartCtx.items.length === 0}
        >
          Go to Checkout
        </button>
      </form>
    </Modal>
  );
}

export default CartModal;

import { useContext } from "react";
import CartContext from "../store/CartContext";
import { useModals } from "../store/ModalContext";

export default function Header() {
  const { actions } = useModals()
  const cartCtx = useContext(CartContext);

  const numberOfOrders = cartCtx.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header id="main-header">
      <div id="title">
        <img src="./logo.jpg" alt="Logo" />
        <h1>REACTFOOD</h1>
      </div>
      <button onClick={actions.openCartModal} className="text-button">
        Cart&#40;{numberOfOrders}&#41;
      </button>
    </header>
  );
}

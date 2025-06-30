import { useRef } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import CartModal from "./components/CartModal";
import Checkout from "./components/Checkout";
import SuccessModal from "./components/SuccessModal";
import { CartContextProvider } from "./store/CartContext";
import { ModalProvider } from "./store/ModalContext";

function App() {
  // const cartDialog = useRef();
  // const checkoutDialog = useRef();
  // const successDialog = useRef();

  // function handleCartClick() {
  //   // if (+cart.totalPrice !== 0) {
  //   cartDialog.current.open();
  //   // }
  // }

  // function handleGoToCheckout() {
  //   checkoutDialog.current.open();
  // }

  // function handleSuccess() {
  //   successDialog.current.open();
  // }

  return (
    <CartContextProvider>
      <ModalProvider>
        <CartModal />
        <Checkout />
        <SuccessModal />
        <Header />
        <Products />
      </ModalProvider>
    </CartContextProvider>
  );
}

export default App;

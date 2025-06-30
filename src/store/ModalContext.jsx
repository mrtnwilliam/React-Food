import { createContext, useContext, useRef } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const cartModalref = useRef();
  const checkoutModalRef = useRef();
  const successModalRef = useRef();

  const openCartModal = () => cartModalref.current?.open();
  const openCheckoutModal = () => {
    cartModalref.current?.close();
    checkoutModalRef.current?.open();
  };
  const openSuccessModal = () => {
    checkoutModalRef.current?.close();
    successModalRef.current?.open();
  };

  const value = {
    refs: { cartModalref, checkoutModalRef, successModalRef },
    actions: { openCartModal, openCheckoutModal, openSuccessModal },
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModals() {
  return useContext(ModalContext);
}

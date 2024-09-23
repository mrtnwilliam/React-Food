import { useRef, useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import CartModal from "./components/CartModal";
import Checkout from "./components/Checkout";
import SuccessModal from "./components/SuccessModal";

function App() {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [cart, setCart] = useState({
    meals: [],
    numberOfOrders: 0,
    totalPrice: 0,
  });
  const cartDialog = useRef();
  const checkoutDialog = useRef();
  const successDialog = useRef();

  function handleCartClick() {
    if (+cart.totalPrice !== 0) {
      cartDialog.current.open();
    }
  }

  function handleGoToCheckout() {
    checkoutDialog.current.open();
  }

  function handleSuccess() {
    successDialog.current.open();
  }

  function handleAddProduct(id) {
    setCart((prevCart) => {
      const updatedMeals = [...prevCart.meals];
      const existingMealIndex = updatedMeals.findIndex(
        (meal) => meal.id === id
      );
      const existingMeal = updatedMeals[existingMealIndex];
      let price = +prevCart.totalPrice;

      if (existingMeal) {
        const updatedMeal = {
          ...existingMeal,
          quantity: existingMeal.quantity + 1,
        };
        updatedMeals[existingMealIndex] = updatedMeal;
        price += +updatedMeal.price;
      } else {
        const meal = availableMeals.find((product) => product.id === id);
        updatedMeals.push({
          id,
          name: meal.name,
          price: meal.price,
          quantity: 1,
        });
        price += +meal.price;
      }
      return {
        meals: updatedMeals,
        numberOfOrders: prevCart.numberOfOrders + 1,
        totalPrice: price.toFixed(2),
      };
    });
  }

  function updateItemQuantity(id, amount) {
    setCart((prevCart) => {
      const updatedItems = [...prevCart.meals];
      const updatedItemIndex = updatedItems.findIndex((item) => item.id === id);
      const updatedItem = { ...updatedItems[updatedItemIndex] };
      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }
      const totalPrice = +prevCart.totalPrice + amount * +updatedItem.price;

      if (totalPrice === 0) {
        cartDialog.current.close();
      }

      return {
        meals: updatedItems,
        numberOfOrders: prevCart.numberOfOrders + amount,
        totalPrice: totalPrice.toFixed(2),
      };
    });
  }

  return (
    <>
      <CartModal
        cart={cart}
        ref={cartDialog}
        updateItemQuantity={updateItemQuantity}
        handleClick={handleGoToCheckout}
      />
      <Checkout cart={cart} ref={checkoutDialog} handleSuccess={handleSuccess} />
      <SuccessModal ref={successDialog} />
      <Header cart={cart} handleClick={handleCartClick} />
      <Products
        handleAddProduct={handleAddProduct}
        availableMeals={availableMeals}
        setAvailableMeals={setAvailableMeals}
      />
    </>
  );
}

export default App;

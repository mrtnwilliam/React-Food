import { useContext } from "react";
import CartContext from "../store/CartContext";

export default function Product({ product }) {
  const cartCtx = useContext(CartContext);

  function handleAddToCart() {cartCtx.addItem(product)}

  return (
    <li className="meal-item">
      <article>
        <img
          src={`/${product.image}`}
          alt={product.name}
        />
        <h3>{product.name}</h3>
        <div>
          <div className="meal-item-price">${product.price}</div>
          <div className="meal-item-description">{product.description}</div>
        </div>
        <div className="meal-item-actions">
          <button
            className="button"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </article>
    </li>
  );
}

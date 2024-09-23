export default function Product({ product , handleAddProduct }) {
  return (
    <li className="meal-item">
      <article>
        <img
          src={`http://localhost:3000/${product.image}`}
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
            onClick={() => handleAddProduct(product.id)}
          >
            Add to Cart
          </button>
        </div>
      </article>
    </li>
  );
}

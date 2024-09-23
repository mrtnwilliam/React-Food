import { useState , useEffect } from "react";
import Product from "./Product";
import { fetchProducts } from "../http";

export default function Products({handleAddProduct , availableMeals , setAvailableMeals}) {

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);

      try {
        const products = await fetchProducts();
        setAvailableMeals(products);
      } catch (error) {
        setError(error.message);
      }

      setIsFetching(false);
    }

    fetchMeals();
  }, []);

  return (
    <>
      {isFetching && <p className="fallback-text">Fetching Meals...</p>}
      {!isFetching && availableMeals.length === 0 && (
        <p className="fallback-text">{error || "Failed to fetch meals."}</p>
      )}
      {!isFetching && availableMeals.length > 0 && (
        <ul id="meals">
          {availableMeals.map((meal) => (
            <Product product={meal} key={meal.id} handleAddProduct={handleAddProduct} />
          ))}
        </ul>
      )}
    </>
  );
}

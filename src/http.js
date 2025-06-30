const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/api/meals`);
  const resData = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch Products");
  }
  return resData;
}

export async function postOrder(order) {
  const response = await fetch(`${BASE_URL}/api/orders`, {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message);
  }

  return resData.message;
}

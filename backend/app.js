const express = require("express");
const app = express();
const cors = require("cors");
const fs = require('fs');
const path = require('path');

app.use(cors());
app.use(express.json());

app.get("/api/meals", async (req, res) => {
  try {
    const meals = await fs.promises.readFile(
      path.join(__dirname, "data", "available-meals.json"),
      "utf8"
    );
    res.json(JSON.parse(meals));
  } catch (error) {
    res.status(500).json({ message: "Failed to load meals." });
    console.error(error);
  }
});

app.post("/api/orders", async (req, res) => {
  const orderData = req.body.order;

  if (
    orderData === null ||
    orderData.items === null ||
    orderData.items.length === 0
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  if (process.env.VERCEL) {
    console.log("Demo order received:", {
      customer: orderData.customer,
      itemCount: orderData.items.length,
    });
    return res.status(201).json({ message: "Demo: Order received!" });
  }

  // Local development (save to JSON)
  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.promises.readFile(
    path.join(__dirname, "data", "orders.json"),
    "utf8"
  );
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.promises.writeFile(
    path.join(__dirname, "data", "orders.json"),
    JSON.stringify(allOrders)
  );
  res.status(201).json({ message: "Order created!" });
});

const start = () => {
  try {
    const port = process.env.PORT || 5000;
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}.........`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
module.exports = app;
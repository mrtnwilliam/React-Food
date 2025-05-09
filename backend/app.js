const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.get("/api/hello", (req, res) => res.send("Hello World!"));

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
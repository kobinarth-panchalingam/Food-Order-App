const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
dotenv.config();

const app = express();

const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const foodRoutes = require("./routes/food.routes");
const settingRoutes = require("./routes/setting.routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet())

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/settings", settingRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});

const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
dotenv.config();

const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const foodRoutes = require("./routes/food.routes");
const settingRoutes = require("./routes/setting.routes");
const productRoutes = require("./routes/product.routes");
const usageRecordRoutes = require("./routes/usageRecord.routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/products", productRoutes);
app.use("/api/usage-records", usageRecordRoutes);

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});

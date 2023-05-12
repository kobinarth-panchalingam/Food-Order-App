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

// const nodes_route = require("./routes/nodes.route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// app.use("/api/nodes", nodes_route);

// User routes
app.use("/api/users", userRoutes);
// Order routes
app.use("/api/orders", orderRoutes);
app.use("/api/foods", foodRoutes);

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const Food = require("./models/food.model");

const foodData = [
  {
    name: "Poori 1 set",
    price: 240,
  },
  {
    name: "Poll pittu",
    price: 195,
  },
  {
    name: "Masala Dosa",
    price: 300,
  },
  {
    name: "Chiillie Parotta",
    price: 277,
  },
  {
    name: "Mani Puttu",
    price: 195,
  },
  // Add more food items as needed
];

const seedFoodData = async () => {
  try {
    await Food.deleteMany(); // Clear existing food data
    const insertedFood = await Food.insertMany(foodData);
    console.log("Food data seeded successfully:", insertedFood);
  } catch (error) {
    console.error("Error seeding food data:", error);
  } finally {
    mongoose.disconnect(); // Disconnect from the database after seeding
  }
};

// seedFoodData();

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

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
app.use("/api/settings", settingRoutes);

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const Food = require("./models/food.model");
const User = require("./models/user.model");
const Setting = require("./models/settings.model");
const Order = require("./models/order.model");

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
    name: "Thosai 2 Nos",
    price: 230,
  },
  {
    name: "Paratha 1 set",
    price: 180,
  },
  {
    name: "Chapathi (2pcs)",
    price: 310,
  },
  {
    name: "Shawarma",
    price: 150,
  },
  {
    name: "Gee Thosa",
    price: 325,
  },
  {
    name: "Paper Dosai",
    price: 240,
  },
  {
    name: "Ghee Masaala Dosai",
    price: 380,
  },
  {
    name: "Onion Dosai",
    price: 315,
  },
  {
    name: "Cheese Dosai",
    price: 415,
  },
  {
    name: "Idli (2pcs)",
    price: 260,
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

const createAdmin = async () => {
  try {
    const newUser = new User({ name: "Kobinarth", index: 200307, gender: "male", role: "admin" });
    const savedUser = await newUser.save();
    console.log(savedUser);
  } catch (error) {
    console.log(error);
  }
};

const updateAllUsersToUserRole = async () => {
  try {
    // Update all users to "user" role
    await Setting.create({ canOrderEsaki: false, canOrderUniversity: false });

    console.log("All users updated to 'user' role successfully.");
  } catch (error) {
    console.error("Error updating users:", error);
  }
};

// Call the function to update all users to "user" role
// updateAllUsersToUserRole();

// seedFoodData();
// createAdmin();

// Sort the documents by createdAt in descending order and limit to the last 10
// const run = async () => {
//   const last10Orders = await Order.find().sort({ createdAt: -1 }).limit(7);

//   // Update the isFinished field for the last 10 orders
//   const updatedOrders = await Promise.all(
//     last10Orders.map(async (order) => {
//       order.isFinished = false;
//       return order.save();
//     })
//   );

//   console.log(updatedOrders);
// };
// run();

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});

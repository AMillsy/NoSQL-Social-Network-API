const connection = require("../config/connection");
const { User, Thought } = require("../models");

const userData = require("./user.json");

connection.on("error", (err) => err);

connection.once("open", seedData);

async function seedData() {
  await connection.collection("users").deleteMany({});

  await User.collection.insertMany(userData);

  console.log("Database has been seeded!");
  process.exit(0);
}

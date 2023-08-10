const connection = require("../config/connection");
const { User, Thought } = require("../models");

const userData = require("./user.json");
const thoughtData = require("./thoughts.json");

connection.on("error", (err) => err);

connection.once("open", seedData);

async function seedData() {
  await connection.collection("users").deleteMany({});

  const allUsers = await User.collection.insertMany(userData);

  thoughtData.forEach(async (thought) => {
    const user = thought.username;

    const findUser = await User.find({ username: user });

    if (findUser) {
      const createdThought = await Thought.collection.insertOne(thought);

      const updatedUser = await User.findOneAndUpdate({ username: user }, {});
    }
  });

  console.log("Database has been seeded!");
  process.exit(0);
}

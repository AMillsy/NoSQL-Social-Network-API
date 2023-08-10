const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { Schema } = require("mongoose");

const userData = require("./user.json");
const thoughtData = require("./thoughts.json");

connection.on("error", (err) => err);

connection.once("open", seedData);

async function seedData() {
  await connection.collection("users").deleteMany({});
  await connection.collection("thoughts").deleteMany({});

  const allUsers = await User.collection.insertMany(userData);

  for (const thought of thoughtData) {
    const user = thought.username;

    const findUser = await User.find({ username: user });

    console.log(findUser);

    if (findUser) {
      console.log("Found a user");
      const createdThought = await Thought.collection.insertOne(thought);
      console.log(createdThought);
      const updatedUser = await User.findOneAndUpdate(
        { username: user },
        {
          $addToSet: {
            thoughts: {
              _id: createdThought.insertedId,
            },
          },
        }
      );
    }
  }

  console.log("Database has been seeded!");
  process.exit(0);
}

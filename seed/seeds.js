const connection = require("../config/connection");
const { User, Thought } = require("../models");

const userData = require("./user.json");
const thoughtData = require("./thoughts.json");
const reactionData = require("./reaction.json");

const { Types } = require("mongoose");

connection.on("error", (err) => err);

connection.once("open", seedData);

async function seedData() {
  await connection.collection("users").drop({});
  await connection.collection("thoughts").drop({});

  const allUsers = await User.collection.insertMany(userData);

  for (const [index, thought] of thoughtData.entries()) {
    console.log(thought);
    const user = thought.username;

    const findUser = await User.find({ username: user });

    console.log(findUser);

    if (findUser) {
      console.log("Found a user");
      const createdThought = await Thought.collection.insertOne({
        username: thought.username,
        thoughtText: thought.thoughtText,
        reactions: { _id: new Types.ObjectId(), ...reactionData[index] },
      });
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

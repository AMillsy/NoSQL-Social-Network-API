const { ObjectId } = require("mongoose").Types;
const { Thought, User } = require("../models");

module.exports = {
  getAllThoughts: async function (req, res) {
    try {
      const allThoughts = await Thought.find({});

      if (!allThoughts)
        return res.status(404).json({ message: "No thoughts found" });

      res.status(200).json(allThoughts);
    } catch (error) {
      res.status(404).json(error);
    }
  },
  getSingleThought: async function (req, res) {
    try {
      const thought = await Thought.findById(req.params.id);

      if (!thought)
        return res.status(404).json({ message: "No thought found" });

      res.status(200).json(thought);
    } catch (error) {
      res.status(404).json(error);
    }
  },
  createThought: async function (req, res) {
    try {
      const createdThought = await Thought.create(req.body);

      const user = req.body.username;

      const updateUser = await User.findOneAndUpdate(
        { username: user },
        {
          $addToSet: { thoughts: new ObjectId(createdThought.insertedId) },
        },
        { new: true }
      ).populate("thoughts");

      if (!updateUser)
        return res
          .status(404)
          .json({ message: "Thought created but no user found" });

      res.status(200).json({
        message: "Thought created and added to user",
        user: updatedUser,
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
};

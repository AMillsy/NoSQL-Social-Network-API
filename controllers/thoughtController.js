const { ObjectId } = require("mongoose").Types;
const { Thought, User, Reaction } = require("../models");

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

      console.log(createdThought);
      const updateUser = await User.findOneAndUpdate(
        { username: user },
        {
          $addToSet: {
            thoughts: { _id: new ObjectId(createdThought._id) },
          },
        },
        { new: true }
      ).populate("thoughts");

      if (!updateUser)
        return res.status(404).json({
          message: "Thought created but no user found",
          thought: createdThought,
        });

      res.status(200).json({
        message: "Thought created and added to user",
        user: updateUser,
      });
    } catch (error) {
      console.error(error);
      res.status(404).json(error);
    }
  },
  updateThought: async function (req, res) {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      if (!updateThought)
        return res.status(404).json({ message: "No thought found" });

      res.status(200).json(updateThought);
    } catch (error) {
      res.status(404).json(error);
    }
  },
  deleteThought: async function (req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({
        _id: req.params.id,
      });

      if (!deletedThought)
        return res.status(404).json({ message: "No thought found" });

      res
        .status(200)
        .json({ message: "Thought has been deleted", thought: deletedThought });
    } catch (error) {
      res.status(404).json(error);
    }
  },
  addReaction: async function (req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if (!updatedThought)
        return res
          .status(404)
          .json({ message: "Not thought found and reaction not created" });

      res.status(200).json({
        message: "Reaction added to thought",
        thought: updatedThought,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  },
  removeReaction: async function (req, res) {
    try {
      const removedReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $pull: {
            reactions: { _id: new ObjectId(req.body.reactionId) },
          },
        },
        { new: true }
      );

      if (!removedReaction)
        return res.status(404).json({ message: "Reaction not removed" });

      res.status(200).json({
        message: "Reaction has been removed",
        reaction: removedReaction,
      });
    } catch (error) {
      res.status(404).json(error);
    }
  },
};

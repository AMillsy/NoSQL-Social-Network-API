const { User, Thought } = require("../models");

module.exports = {
  findAllUsers: async function (req, res) {
    try {
      const allUsers = await User.find({}).populate("thoughts");

      if (!allUsers) return res.status(404).json({ message: "No users found" });

      res.status(200).json(allUsers);
    } catch (error) {
      res.status(400).json({ message: "An error has occured" });
    }
  },
  findSingleUser: async function (req, res) {
    try {
      const findUser = await User.findById(req.params.id)
        .select(["-_id", "-id"])
        .populate("thoughts");

      if (!findUser) res.status(404).json({ message: "No user found" });

      res.status(200).json(findUser);
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  },

  createNewUser: async function (req, res) {
    try {
      const newUser = await User.create(req.body);

      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

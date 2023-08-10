const router = require("express").Router();

const {
  findAllUsers,
  findSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/").get(findAllUsers).post(createNewUser);
router.route("/:id").get(findSingleUser).put(updateUser).delete(deleteUser);
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);
module.exports = router;

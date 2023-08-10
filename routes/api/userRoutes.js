const router = require("express").Router();

const {
  findAllUsers,
  findSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

router.route("/").get(findAllUsers).post(createNewUser);
router.route("/:id").get(findSingleUser).put(updateUser).delete(deleteUser);
module.exports = router;

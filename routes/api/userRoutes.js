const router = require("express").Router();

const {
  findAllUsers,
  findSingleUser,
} = require("../../controllers/userController");

router.get("/", findAllUsers);
router.get("/:id", findSingleUser);
module.exports = router;

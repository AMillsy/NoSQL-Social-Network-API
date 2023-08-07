const router = require("express").Router();

const { findAllUsers } = require("../../controllers/userController");

router.get("/", findAllUsers);

module.exports = router;

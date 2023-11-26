const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const { auth } = require("../utils");

router.get("/:userId", authController.getProfileInfo);
router.put("/:userId", auth(), authController.editProfileInfo);
router.delete("/:userId", auth(), authController.deleteProfile);

module.exports = router;

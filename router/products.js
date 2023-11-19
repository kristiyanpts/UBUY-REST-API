const express = require("express");
const router = express.Router();
const { postController } = require("../controllers");

router.get("/", themeController.getThemes);
router.post("/", auth(), themeController.createTheme);

router.get("/:themeId", themeController.getTheme);
router.post("/:themeId", auth(), postController.createPost);
router.put("/:themeId", auth(), themeController.subscribe);
router.put("/:themeId/posts/:postId", auth(), postController.editPost);
router.delete("/:themeId/posts/:postId", auth(), postController.deletePost);

module.exports = router;

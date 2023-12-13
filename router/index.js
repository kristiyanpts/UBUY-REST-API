const router = require("express").Router();
const users = require("./users");
const stripe = require("./stripe");
const products = require("./products");
const test = require("./test");
const { authController } = require("../controllers");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.use("/stripe", stripe);

router.use("/users", users);
router.use("/products", products);
router.use("/info", test);

module.exports = router;

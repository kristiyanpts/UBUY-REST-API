const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { auth } = require("../utils");

router.get("/", productController.getLatestProducts);
router.get("/:productId", productController.getProductById);

router.post("/", auth(), productController.createProduct);

router.put("/:productId", auth(), productController.editProduct);
router.delete("/:productId", auth(), productController.deleteProduct);

// router.get("/:productId/reviews", auth(), productController.getReviews);
router.put("/:productId/reviews", auth(), productController.addReview);
router.delete(
  "/:productId/reviews/:reviewId",
  auth(),
  productController.deleteReview
);

module.exports = router;

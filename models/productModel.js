const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const URL_PATTERN = /^https?:\/\/.+$/i;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [5, "Product name should be at least 5 characters"],
    },
    description: {
      type: String,
      required: true,
      minlength: [20, "Product description should be at least 20 characters"],
      maxlength: [500, "Product description should not exceed 500 characters"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Product quantity should be at least 1"],
    },
    date: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [1, "Product price should be at least 1"],
    },
    category: {
      type: String,
      enum: {
        values: ["home", "electronics", "gaming", "other"],
        message: "Category must be home, electronics, gaming or other",
      },
      required: true,
    },
    imageURL: {
      type: String,
      validate: {
        validator: function (value) {
          return URL_PATTERN.test(value);
        },
        message: "Image URL is invalid",
      },
      required: true,
    },
    buyers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    reviews: [
      {
        caption: { type: String, required: true },
        message: { type: String, required: true },
        date: { type: String, required: true },
        author: { type: ObjectId, ref: "User" },
      },
    ],
    owner: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Product", productSchema);

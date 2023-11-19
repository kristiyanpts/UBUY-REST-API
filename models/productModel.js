const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
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
        likes: [{ type: ObjectId, ref: "User" }],
      },
    ],
    owner: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Product", productSchema);

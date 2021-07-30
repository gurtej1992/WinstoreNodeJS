const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    product: {
      type: String,
      ref: "Product",
    },
    user: {
      type: String,
      ref: "User",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);

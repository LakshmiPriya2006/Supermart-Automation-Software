import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
        total: Number,
      }
    ],
    totalAmount: Number
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

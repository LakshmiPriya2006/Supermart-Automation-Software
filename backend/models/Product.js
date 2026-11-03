import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    image: { type: String } // <-- image path
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);


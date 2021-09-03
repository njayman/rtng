import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
});

const ProductModel =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default ProductModel;

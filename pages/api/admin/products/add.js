import connectDB from "../../../../utils/connectMongoose";
import Product from "../../../../models/product";

const handler = async (req, res) => {
  console.log(req.body, "j");
  try {
    const product = new Product(req.body);
    await product.save();
    return res
      .status(200)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default connectDB(handler);

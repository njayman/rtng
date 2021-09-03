import connectDB from "../../../../utils/connectMongoose";
import Product from "../../../../models/product";

const handler = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default connectDB(handler);

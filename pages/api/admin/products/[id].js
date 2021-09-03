import connectDB from "../../../../utils/connectMongoose";
import Product from "../../../../models/product";

const handler = async (req, res) => {
  const { id } = req.query;
  try {
    const product = await Product.findOne({ _id: id });
    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default connectDB(handler);

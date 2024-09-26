import mongoose from "mongoose";
mongoose.set("strictQuery", true);
const connectToMongoDB = async (url: string) => mongoose.connect(url);

export default connectToMongoDB;
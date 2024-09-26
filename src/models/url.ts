import mongoose from "mongoose";

const schema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  visitHistory: [{
    timestamp: {
      type: Number,
    }
  }],
}, { timestamps: true });
const URL = mongoose.model("URL", schema);
export default URL;
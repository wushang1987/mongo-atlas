import mongoose from "mongoose";

const schema = mongoose.Schema;
const userModel = new schema({
  userName: String,
  email: String,
});

export default mongoose.model("User", userModel);

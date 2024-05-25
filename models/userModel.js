import mongoose from "mongoose";

const schema = mongoose.Schema;
const userModel = new schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export default mongoose.model("User", userModel);

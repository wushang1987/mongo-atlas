import mongoose from "mongoose";

const schema = mongoose.Schema;
const UserSchema = new schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export default mongoose.model("User", UserSchema);

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = mongoose.Schema;
const PostSchema = new schema({
  title: String,
  content: Object,
});

export default mongoose.model("Post", PostSchema);

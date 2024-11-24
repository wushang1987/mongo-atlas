import mongoose from "mongoose";

async function connectDB() {
  // await mongoose.connect("mongodb://127.0.0.1:27017/authTest");
  await mongoose.connect(
    "mongodb+srv://WWD:nawb4jmXytHUu90v@cluster0.tfwzmi6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = mongoose.connection;
  db.on("connection", (stream) => {
    console.log("someone connected!");
  });

  db.once("connection", (stream) => {
    console.log("Ah, we have our first user!");
  });
}

export default connectDB;

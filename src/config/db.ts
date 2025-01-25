import mongoose from "mongoose";
const DB_URI = String(process.env.DB_URI);
function connectDB() {
  return mongoose.connect(DB_URI);
}
export default connectDB;

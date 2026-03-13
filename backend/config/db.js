// import mongoose from "mongoose";

// export const connectDb = async()=>{
//     await mongoose.connect('mongodb+srv://jyotinarwat390_db_user:eQOmuTzEAk1leZKO@cluster0.8sxk1tm.mongodb.net/UniEvent').then(()=>{console.log("DB connected")});
// }

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
};
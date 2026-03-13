import mongoose from "mongoose";

export const connectDb = async()=>{
    await mongoose.connect('mongodb+srv://jyotinarwat390_db_user:eQOmuTzEAk1leZKO@cluster0.8sxk1tm.mongodb.net/UniEvent').then(()=>{console.log("DB connected")});
}
import express from "express";
import cors from "cors"
import { connectDb } from "./config/db.js";
import eventRouter from "./routes/eventRoute.js";

const port = 4000;
const app = express();

app.use(express.json())
app.use(cors())

connectDb();

app.use("/api/event" , eventRouter);
app.use("/images" , express.static('uploads'));

app.get("/" , (req,res)=>{
    res.send("api working")
})



app.listen(port , ()=>{
    console.log('app is listening')
})
//mongodb+srv://jyotinarwat390_db_user:<db_password>@cluster0.8sxk1tm.mongodb.net/?
//mongodb+srv://jyotinarwat390_db_user:<db_password>@cluster0.8sxk1tm.mongodb.net/?appName=Cluster0
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name:{type:String , required:true},
    about:{type:String , required:true},
    club:{type:String , required:true},
    time:{type:String , required:true},
    date:{type:Date , required:true},
    place:{type:String , required:true},
    poster:{type:String , reqiured:true}
})

const eventModel =mongoose.model.event || mongoose.model("event" , eventSchema);

export default eventModel;
import eventModel from "../models/eventModel.js";
import fs from 'fs'

const addEvent = async(req,res)=>{
    let image_filename = `${req.file.filename}`;

    const event = new eventModel({
        name:req.body.name,
      about:req.body.about,
      club:req.body.club,
      place:req.body.place,
      time:req.body.time,
      date:req.body.date,
      poster: image_filename
     })
     try {
        await event.save();
        res.json({success:true , message:"event added"});
     } catch (error) {
        console.log(error);
        res.json({success:false , message:"error"});
     }
}

//list of event
const listevent = async(req,res)=>{
try {
    const events = await eventModel.find({});
    res.json({success:true , data:events});
} catch (error) {
    console.log(error);
    res.json({success:false , message:"error" })
}
}
//remove event
const removeEvent =  async(req,res)=>{
    try {
        const remove = await eventModel.findById(req.body.id);
        fs.unlink(`uploads/${remove.image}`, ()=>{});

        await eventModel.findByIdAndDelete(req.body.id);
        res.json({success:true , message:"event removed"});
    } catch (error) {
       console.log(error);
    res.json({success:false , message:"error" })  ;
    }
}

//show event

const showEvent = async(req,res)=>{
    try {
    const { id } = req.params.id;
    const updatedEvent = await eventModel.findByIdAndUpdate(
      id,
       {...req.body}, // data from frontend
      { new: true } // return updated document
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }

}
export {addEvent , listevent , removeEvent , showEvent}
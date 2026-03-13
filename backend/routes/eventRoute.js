import { addEvent, listevent , removeEvent, showEvent } from "../controllers/eventController.js";
import express from 'express'
import multer from "multer";


const eventRouter = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null , `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

eventRouter.post("/add" , upload.single("image") , addEvent);
eventRouter.put('/:id' , showEvent);
eventRouter.get("/list" , listevent);
eventRouter.post("/remove" , removeEvent);


export default eventRouter;
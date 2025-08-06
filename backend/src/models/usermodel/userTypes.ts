import { Document } from "mongoose";

interface userInterface extends Document{
    name:String,
    email:String,
    password:String,
    phone:Number
}

export default userInterface
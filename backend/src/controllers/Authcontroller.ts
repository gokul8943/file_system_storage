import { Request, Response, Express } from "express";
import dotenv from 'dotenv'
import userModel from "../models/usermodel/userModel";


export const regsiter = async (req: Request, res: Response) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            res.status(400).json({ success: false, message: "Missing required fields" });
            return;
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            res.status(409).json({ success: false, message: "Email is already registered" });
            return;
        }
    } catch (error) {

    }
}

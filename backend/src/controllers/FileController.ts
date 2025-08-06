import { Request, Response } from "express";
import fileModel from "../models/filemodel/fileModel";


export const uplaodFile = async (req: Request, res: Response) => {
    try {
        const { data } = req.body

    } catch (error: any) {
        console.error("Error uploading file:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
            details: error.response?.data || error.message
        });
    }
}

export const getFiles = async (req: Request, res: Response) => {
    try {
        const file = await fileModel.find({})
        if (file) {
            res.status(200).json({ message: "File fetched successfully " })
        } else {
            res.status(404).json({ message: 'File Not Found' })
        }
    } catch (error: any) {
        console.error("Error getting files", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
            details: error.response?.data || error.message
        });
    }
}

export const getFile = async (req: Request, res: Response) => {
    try {
        const files = await fileModel.find({})
        if (files) {
            res.status(200).json({ message: "Files fetched successfully " })
        } else {
            res.status(404).json({ message: 'Files Not Found' })
        }
    } catch (error: any) {
        console.error("Error getting file:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
            details: error.response?.data || error.message
        });
    }
}

export const deleteFile = async (req: Request, res: Response) => {
    try {
        const fileId = req.body.fileId
        if (!fileId) {
            res.status(400).json({ message: "fileId not found" })
        }
        const file = await fileModel.deleteOne({ fileId })
    } catch (error: any) {
        console.error("Error in deleteing:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
            details: error.response?.data || error.message
        });
    }
}
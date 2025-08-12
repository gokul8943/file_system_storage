import { Request, Response } from "express";
import fileModel from "../models/filemodel/fileModel";
import { deleteFromS3, uploadToS3 } from "../helpers/s3Helper";


export const uplaodFile = async (req: Request, res: Response) => {
    try {
        const file = req.body.file
        if (file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const s3Url = await uploadToS3(file.buffer, file.originalname, file.mimetype);

        const newFile = await fileModel.create({
            fileName: file.originalname,
            fileSize: file.size,
            fileType: file.mimetype,
            s3Url,
        });

        res.status(201).json({ message: "File uploaded successfully", file: newFile });

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
        const fileId = req.params.fileId
        const files = await fileModel.findById(fileId)
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
    const { fileId } = req.body;
    if (!fileId) {
      return res.status(400).json({ message: "fileId is required" });
    }

    const file = await fileModel.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const fileKey:any = file.s3Url.split(".amazonaws.com/")[1]; 
    await deleteFromS3(fileKey);

    await fileModel.deleteOne({ _id: fileId });

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting file:", error);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};

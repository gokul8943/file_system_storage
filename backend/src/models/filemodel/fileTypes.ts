import mongoose, { Document } from 'mongoose';

export interface IFile extends Document {
  user: mongoose.Types.ObjectId;
  fileName: string;
  s3Key: string; // key used in S3 bucket
  s3Url: string; 
  fileType: string;
  fileSize: number;
  folder?: string; 
}
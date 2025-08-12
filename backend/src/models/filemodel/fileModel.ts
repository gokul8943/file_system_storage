import mongoose, { Schema } from 'mongoose';
import { IFile } from './fileTypes';

const FileSchema: Schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        fileName: { type: String, required: true },
        s3Key: { type: String, required: true },
        s3Url: { type: String, required: true },
        fileType: { type: String, required: true },
        fileSize: { type: Number, required: true },
        folder: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model<IFile>('File', FileSchema)
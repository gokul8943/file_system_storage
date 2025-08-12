import express, { Router } from "express"
import { deleteFile, getFile, getFiles, uplaodFile } from "../controllers/FileController"
import { upload } from "../middlewares/upload"


const fileRouter = express.Router()

fileRouter.post('/upload',upload.single("file"),uplaodFile)
fileRouter.post('/get',getFile)
fileRouter.post('/get-files',getFiles)
fileRouter.post('/delete',deleteFile)


export default fileRouter


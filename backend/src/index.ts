import express from "express"
import dotenv from 'dotenv'
import connectDb from "./config/dbConnection"


dotenv.config()
const app = express()
const Port = process.env.PORT
connectDb()
app.listen(Port, () => {
    console.log(`http://localhost:${Port}`);
})
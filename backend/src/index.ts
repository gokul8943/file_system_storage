import express from "express"
import dotenv from 'dotenv'
import connectDb from "./config/dbConnection"
import cors from 'cors'
import authRouter from "./routes/authRoutes"


dotenv.config()
const app = express()
const Port = process.env.PORT
connectDb()
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))

app.use('/auth', authRouter)


app.listen(Port, () => {
    console.log(`http://localhost:${Port}`);
})
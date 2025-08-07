import express, { Router } from "express"
import { register,login } from "../controllers/Authcontroller"

const authRouter = express.Router()

authRouter.post('/login',login )
authRouter.post('/register',register)


export default authRouter
import express, { Router } from "express"
import { register,login } from "../controllers/Authcontroller"

const userRouter = express.Router()

userRouter.post('/login',login )
userRouter.post('/register',register)


export default userRouter
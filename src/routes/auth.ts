import express from 'express'
import { signInController, signOutController } from '../controllers/auth'

const authRouter = express.Router()

//Sign in
authRouter.post('/login', signInController)

//Sign out
authRouter.post('/logout', signOutController)

export default authRouter

import express from 'express'
import {
  getEmployeeByEmailAndPassword,
  updateEmployeeLastSeen,
  cookieJwtAuthentication
} from '../middleware/middlewares'
import {
  signInController,
  signUpController,
  signOutController
} from '../controllers/auth'

const authRouter = express.Router()

//Sign in
authRouter.post(
  '/login',
  getEmployeeByEmailAndPassword,
  updateEmployeeLastSeen,
  signInController
)

//Sign up
authRouter.post(
  '/register', //cookieJwtAuthentication,
  signUpController
)

//Sign out
authRouter.post('/logout', signOutController)

export default authRouter

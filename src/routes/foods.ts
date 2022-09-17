import express from 'express'
import multer from 'multer'

import {
  cookieJwtAuthentication,
  getFoodByName,
  getFoodTypeByName
} from '../middleware/middlewares'
import {
  getAllFoodController,
  getOneFoodController,
  createFoodController,
  patchFoodController,
  deleteFoodController
} from '../controllers/foods'

const foodsRouter = express.Router()
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 } // 1024bytes * 1024bytes = 1 megabyte
})

//Getting all
foodsRouter.get('/', getAllFoodController)

//Getting one
foodsRouter.get('/:name', getFoodByName, getOneFoodController)

//Creating
foodsRouter.post(
  '/',
  //cookieJwtAuthentication,
  upload.single('image'),
  getFoodTypeByName,
  createFoodController
)

//Updating one
foodsRouter.patch(
  '/:name',
  //cookieJwtAuthentication,
  upload.single('image'),
  getFoodByName,
  getFoodTypeByName,
  patchFoodController
)

//Deleting
foodsRouter.delete(
  '/:name',
  //cookieJwtAuthentication,
  getFoodByName,
  deleteFoodController
)

export default foodsRouter

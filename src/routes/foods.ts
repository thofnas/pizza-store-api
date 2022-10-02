import express from 'express'
import multer from 'multer'

import {
  cookieJwtAuthentication,
  getFoodByID,
  getFoodTypeByIDForFoodsPatchOrPost
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
foodsRouter.get('/:id', getFoodByID, getOneFoodController)

//Creating
foodsRouter.post(
  '/',
  //cookieJwtAuthentication,
  upload.single('image'),
  getFoodTypeByIDForFoodsPatchOrPost,
  createFoodController
)

//Updating one
foodsRouter.patch(
  '/:id',
  //cookieJwtAuthentication,
  upload.single('image'),
  getFoodTypeByIDForFoodsPatchOrPost,
  getFoodByID,
  patchFoodController
)

//Deleting
foodsRouter.delete(
  '/:id',
  //cookieJwtAuthentication,
  getFoodByID,
  deleteFoodController
)

export default foodsRouter

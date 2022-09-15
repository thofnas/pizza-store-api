import express from 'express'
import {
  cookieJwtAuthentication,
  getFood,
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

//Getting all
foodsRouter.get('/', getAllFoodController)

//Getting one
foodsRouter.get('/:id', getFood, getOneFoodController)

//Creating
foodsRouter.post(
  '/',
  //cookieJwtAuthentication,
  getFoodTypeByName,
  createFoodController
)

//Updating one
foodsRouter.patch(
  '/:id',
  //cookieJwtAuthentication,
  getFood,
  getFoodTypeByName,
  patchFoodController
)

//Deleting
foodsRouter.delete(
  '/:id',
  //cookieJwtAuthentication,
  getFood,
  deleteFoodController
)

export default foodsRouter

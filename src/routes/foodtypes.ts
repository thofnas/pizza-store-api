import express from 'express'
import {
  cookieJwtAuthentication,
  getFoodTypeByName
} from '../middleware/middlewares'
import {
  getAllFoodTypesController,
  getOneFoodTypeController,
  createFoodTypeController,
  patchFoodTypeController,
  deleteFoodTypeController
} from '../controllers/foodtypes'

const foodTypesRouter = express.Router()

//Getting all
foodTypesRouter.get('/', getAllFoodTypesController)

//Getting one
foodTypesRouter.get('/:type', getFoodTypeByName, getOneFoodTypeController)

//Creating
foodTypesRouter.post(
  '/', //cookieJwtAuthentication,
  createFoodTypeController
)

//Updating one
foodTypesRouter.patch(
  '/:type',
  //cookieJwtAuthentication,
  getFoodTypeByName,
  patchFoodTypeController
)

//Deleting
foodTypesRouter.delete(
  '/:type',
  //cookieJwtAuthentication,
  getFoodTypeByName,
  deleteFoodTypeController
)

export default foodTypesRouter

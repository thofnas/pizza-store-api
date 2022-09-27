import express from 'express'
import {
  cookieJwtAuthentication,
  getFoodTypeByID
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
foodTypesRouter.get('/:id', getFoodTypeByID, getOneFoodTypeController)

//Creating
foodTypesRouter.post(
  '/', //cookieJwtAuthentication,
  createFoodTypeController
)

//Updating one
foodTypesRouter.patch(
  '/:id',
  //cookieJwtAuthentication,
  getFoodTypeByID,
  patchFoodTypeController
)

//Deleting
foodTypesRouter.delete(
  '/:id',
  //cookieJwtAuthentication,
  getFoodTypeByID,
  deleteFoodTypeController
)

export default foodTypesRouter

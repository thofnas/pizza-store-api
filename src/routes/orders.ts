import express from 'express'
import {
  cookieJwtAuthentication,
  getFoodTypesByTheirIDs,
  getOrderById,
  getFoodsByName
} from '../middleware/middlewares'
import {
  getAllOrdersController,
  getOneOrderController,
  createOrderController,
  patchOrderController,
  deleteOrderController
} from '../controllers/orders'

const OrdersRouter = express.Router()

//Getting all
OrdersRouter.get(
  '/', //cookieJwtAuthentication,
  getAllOrdersController
)

//Getting one
OrdersRouter.get(
  '/:',
  //cookieJwtAuthentication,
  getOrderById,
  getOneOrderController
)

//Creating
OrdersRouter.post(
  '/',
  getFoodsByName,
  // getFoodTypesByTheirIDs,
  createOrderController
)

//Updating one
OrdersRouter.patch(
  '/:',
  //cookieJwtAuthentication,
  getOrderById,
  patchOrderController
)

//Deleting
OrdersRouter.delete(
  '/:',
  //cookieJwtAuthentication,
  getOrderById,
  deleteOrderController
)

export default OrdersRouter

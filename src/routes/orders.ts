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
  '/:id',
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
  '/:id',
  //cookieJwtAuthentication,
  getOrderById,
  getFoodsByName,
  patchOrderController
)

//Deleting
OrdersRouter.delete(
  '/:id',
  //cookieJwtAuthentication,
  getOrderById,
  deleteOrderController
)

export default OrdersRouter

import express from 'express'
import {
  cookieJwtAuthentication,
  getFoodTypesByIDs,
  getOrderByID,
  getFoodsByIDs
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
  getOrderByID,
  getOneOrderController
)

//Creating
OrdersRouter.post(
  '/',
  getFoodsByIDs,
  // getFoodTypesByTheirIDs,
  createOrderController
)

//Updating one
OrdersRouter.patch(
  '/:id',
  //cookieJwtAuthentication,
  getOrderByID,
  getFoodsByIDs,
  patchOrderController
)

//Deleting
OrdersRouter.delete(
  '/:id',
  //cookieJwtAuthentication,
  getOrderByID,
  deleteOrderController
)

export default OrdersRouter

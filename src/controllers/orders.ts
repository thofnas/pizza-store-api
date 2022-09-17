import { Request, Response } from 'express'
import { fixPersonName } from '../middleware/middlewares'
import Orders from '../models/orders'

const MESSAGE_DELETED = 'Deleted Successfully.'

export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const order = await Orders.find()
    res.json(order)
  } catch (e) {
    res.status(500).json(e)
  }
}

export const getOneOrderController = async (req: Request, res: any) => {
  res.send(res.foodtype)
}

export const createOrderController = async (req: any, res: any) => {
  const { customer_name, phone, address, email } = req.body

  const fixed_name = fixPersonName(customer_name)

  let totalPrice = 0
  const order = new Orders({
    foods: res.foods.map((food: any) => {
      food.price !== undefined ? (totalPrice += food.price) : (totalPrice += 0)
      return {
        id: food.id,
        name: food.name,
        price: food.price || 0,
        image_path: food.image_path
      }
    }),
    order_price: totalPrice,
    customer_name: fixed_name,
    phone,
    address,
    email: email.toLowerCase(),
    created_at: new Date()
  })

  try {
    const newOrder = await order.save()
    res.status(201).json(newOrder)
  } catch (e) {
    res.status(400).json(e)
  }
}

export const patchOrderController = async (req: any, res: any) => {
  const { order_status, customer_name, phone, address, email } = req.body

  if (order_status !== undefined) res.order.order_status = order_status
  if (customer_name !== undefined)
    res.order.customer_name = fixPersonName(customer_name)
  if (phone !== undefined) res.order.phone = phone
  if (address !== undefined) res.order.address = address
  if (email !== undefined) res.order.email = email?.toLowerCase()
  if (res.foods[0] !== undefined) {
    let totalPrice = 0

    res.order.foods = res.foods.map((food: any) => {
      food.price !== undefined ? (totalPrice += food.price) : (totalPrice += 0)
      return {
        id: food.id,
        name: food.name,
        price: food.price,
        image_path: food.image_path
      }
    })

    res.order.total_price = totalPrice
  }

  try {
    const updatedOrder = await res.order.save()
    res.status(201).json(updatedOrder)
  } catch (e) {
    res.status(400).json({ message: e })
  }
}

export const deleteOrderController = async (req: Request, res: any) => {
  try {
    await res.order.deleteOne()
    res.json({ message: MESSAGE_DELETED, type: res.foodType.type })
  } catch (e) {
    res.status(500).json(e)
  }
}

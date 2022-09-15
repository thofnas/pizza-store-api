import { Request, Response } from 'express'
import Orders from '../models/orders'

const MESSAGE_DELETED = 'Deleted Successfully.'

export async function getAllOrdersController(req: Request, res: Response) {
  try {
    const order = await Orders.find()
    res.json(order)
  } catch (e: any) {
    res.status(500).json(e)
  }
}

export async function getOneOrderController(req: Request, res: any) {
  res.send(res.foodtype)
}

export async function createOrderController(this: any, req: any, res: any) {
  const { customer_name, phone, address } = req.body
  let totalPrice = 0
  const order = new Orders({
    foods: res.foods.map((food: any) => {
      totalPrice += food.price
      return {
        id: food.id,
        name: food.name,
        price: food.price
      }
    }),
    order_price: totalPrice,
    customer_name,
    phone,
    address,
    created_at: new Date()
  })

  try {
    const newOrder = await order.save()
    res.status(201).json(newOrder)
  } catch (e: any) {
    res.status(400).json(e)
  }
}

export async function patchOrderController(req: any, res: any) {
  res.status(404).json('Work in progress.')
}

export async function deleteOrderController(req: Request, res: any) {
  try {
    await res.order.deleteOne()
    res.json({ message: MESSAGE_DELETED, type: res.foodType.type })
  } catch (e: any) {
    res.status(500).json(e)
  }
}

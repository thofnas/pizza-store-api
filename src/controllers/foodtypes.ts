import { Request, Response } from 'express'
import FoodTypes from '../models/foodtypes'

const MESSAGE_DELETED = 'Deleted Successfully.'

export async function getAllFoodTypesController(req: Request, res: Response) {
  try {
    const foodtype = await FoodTypes.find()
    res.json(foodtype)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export async function getOneFoodTypeController(req: Request, res: any) {
  res.send(res.foodtype)
}

export async function createFoodTypeController(req: any, res: any) {
  const { type } = req.body

  const foodType = new FoodTypes({
    type: type,
    created_at: new Date()
  })

  try {
    const newFood = await foodType.save()
    res.status(201).json(newFood)
  } catch (e: any) {
    res.status(400).json(e)
  }
}

export async function patchFoodTypeController(req: any, res: any) {
  const { type } = req.body
  res.foodtype.type = type
  res.foodtype.last_update = new Date()

  try {
    const updatedFood = await res.food.save()
    res.status(201).json(updatedFood)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export async function deleteFoodTypeController(req: Request, res: any) {
  try {
    await res.foodType.remove()
    res.json({ message: MESSAGE_DELETED, type: res.foodType.type })
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

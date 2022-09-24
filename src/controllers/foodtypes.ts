import { Request, Response } from 'express'
import { fixThingName } from '../middleware/middlewares'
import FoodTypes from '../models/foodtypes'

const MESSAGE_DELETED = 'Deleted Successfully.'

export const getAllFoodTypesController = async (
  req: Request,
  res: Response
) => {
  try {
    const foodtype = await FoodTypes.find()
    res.json(foodtype)
  } catch (e) {
    res.status(500).json({ message: e })
  }
}

export const getOneFoodTypeController = async (req: Request, res: any) => {
  res.send(res.foodtype)
}
export const createFoodTypeController = async (req: any, res: any) => {
  const { type } = req.body

  const foodType = new FoodTypes({
    type: fixThingName(type),
    created_at: new Date()
  })

  try {
    const newFood = await foodType.save()
    res.status(201).json(newFood)
  } catch (e) {
    res.status(400).json(e)
  }
}

export const patchFoodTypeController = async (req: any, res: any) => {
  const { type } = req.body
  res.foodtype.type = fixThingName(type)
  res.foodtype.last_update = new Date()

  try {
    const updatedFood = await res.food.save()
    res.status(201).json(updatedFood)
  } catch (e) {
    res.status(400).json({ message: e })
  }
}

export const deleteFoodTypeController = async (req: Request, res: any) => {
  try {
    await res.foodtype.remove()
    res.json({ message: MESSAGE_DELETED, type: res.foodtype.type })
  } catch (e) {
    res.status(500).json({ message: e })
  }
}

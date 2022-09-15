import { Request, Response } from 'express'
import path from 'path'
import { unlinkSync } from 'fs'
import mongoose from 'mongoose'
import Foods from '../models/foods'

const MESSAGE_DELETED = 'Deleted Successfully.'
const FOLDER_PATH = path.join(__dirname, '..', 'public', 'foods')
const FOOD_IMAGES_PATH = path.join(FOLDER_PATH, 'images')

export async function getAllFoodController(req: Request, res: Response) {
  try {
    const foods = await Foods.find()
    res.json(foods)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export async function getOneFoodController(req: Request, res: any) {
  res.send(res.food)
}

export async function createFoodController(req: any, res: any) {
  const { name, title, nutritions, calories, fat, sugar, salt, price } =
    req.body
  const { image } = req.files || {}

  const objectId = new mongoose.Types.ObjectId()
  let fileName = ''
  if (image !== undefined) {
    fileName = `${objectId}${path.extname(image.name)}`
  }

  const food = new Foods({
    _id: objectId,
    name: name || title,
    price,
    type: res.foodType._id,
    image_path: fileName,
    created_at: new Date(),
    last_update: new Date(),
    nutritions: nutritions || {
      calories,
      fat,
      sugar,
      salt
    }
  })

  try {
    const newFood = await food.save()
    if (image !== undefined) image.mv(path.resolve(FOOD_IMAGES_PATH, fileName))
    res.status(201).json(newFood)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export async function patchFoodController(req: any, res: any) {
  const { name, title, cost, type, calories, fat, sugar, salt } = req.body
  const { image } = req.files || {}

  res.food.last_update = new Date()
  if (name !== null || title !== null) res.food.name = name || title
  if (cost !== null) res.food.cost = cost
  if (type !== null) res.food.type = res.foodType._id
  if (calories !== null) res.food.nutritions.calories = calories
  if (fat !== null) res.food.nutritions.fat = fat
  if (sugar !== null) res.food.nutritions.sugar = sugar
  if (salt !== null) res.food.nutritions.salt = salt
  if (image !== undefined) {
    const fileName = `${res.food._id}${path.extname(image.name)}`
    unlinkSync(path.resolve(FOOD_IMAGES_PATH, res.food.image_path))
    res.food.image_path = fileName
    image.mv(path.resolve(FOOD_IMAGES_PATH, fileName))
  }
  try {
    const updatedFood = await res.food.save()
    res.status(201).json(updatedFood)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export async function deleteFoodController(req: Request, res: any) {
  try {
    await res.food.remove()
    unlinkSync(path.resolve(FOOD_IMAGES_PATH, res.food.image_path))
    res.json({ message: MESSAGE_DELETED })
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

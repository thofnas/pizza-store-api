import { Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import FoodTypes from '../models/foodtypes'
import Foods from '../models/foods'
import Orders from '../models/orders'

const MESSAGE_CANNOT_FIND_TYPE = 'Cannot find food type.'
const MESSAGE_CANNOT_FIND_FOOD = 'Cannot find food.'
const MESSAGE_CANNOT_FIND_ORDER = 'Cannot find food type.'

export const fixPersonName = (string: string) => {
  return string
    ?.replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    .join(' ')
}

export const fixThingName = (string: string) => {
  return string?.replace(/\s+/g, ' ').trim().toLowerCase()
}

export const getFoodTypeById = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  let foodType
  try {
    foodType = await FoodTypes.findById(req.params.id)
    if (foodType === null)
      return res.status(404).json({ message: MESSAGE_CANNOT_FIND_TYPE })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  res.foodType = foodType
  next()
}

export const getOrderById = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  let order

  try {
    order = await Orders.findById(req.params.id)
    if (order === null)
      return res.status(404).json({ message: MESSAGE_CANNOT_FIND_ORDER })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  res.order = order
  next()
}
export const getFoodTypeByName = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  let foodType

  let type = fixThingName(req.body.type)

  try {
    if (type) {
      foodType = await FoodTypes.findOne({ type: type })
    }
    if (foodType === null)
      return res.status(404).json({ message: MESSAGE_CANNOT_FIND_TYPE })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  res.foodType = foodType
  next()
}

export const getFoodByName = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  let food

  try {
    food = await Foods.findOne({
      name: fixThingName(req.params.name)
    })

    if (food === null)
      return res.status(404).json({ message: MESSAGE_CANNOT_FIND_FOOD })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  res.food = food
  next()
}

export const getFoodsByName = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  let foods

  req.body.foods = req.body.foods?.map((food: string) => {
    return fixThingName(food)
  })

  try {
    foods = await Foods.find({
      name: {
        $in: req.body.foods
      }
    })

    if (foods === null)
      return res.status(404).json({ message: MESSAGE_CANNOT_FIND_FOOD })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  res.foods = foods
  next()
}

export const getFoodTypesByTheirIDs = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  let foodtypes
  try {
    foodtypes = await FoodTypes.find({
      _id: { $in: req.body.id || req.body._id }
    })
    if (foodtypes === null)
      return res.status(404).json({ message: MESSAGE_CANNOT_FIND_TYPE })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  res.foodtypes = foodtypes
  next()
}

export const cookieJwtAuthentication = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  const token = req.cookies.token
  try {
    const decoded = jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET))
    console.log('token verified')

    console.log(decoded)

    res.cookie('token', token, { httpOnly: true })

    next()
  } catch (e: any) {
    res.clearCookie('token')
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

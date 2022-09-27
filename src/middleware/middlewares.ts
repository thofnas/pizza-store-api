import { Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import FoodTypes from '../models/foodtypes'
import Foods from '../models/foods'
import Orders from '../models/orders'

const MESSAGE_CANNOT_FIND_TYPE = 'Cannot find food type.'
const MESSAGE_CANNOT_FIND_FOOD = 'Cannot find food.'
const MESSAGE_CANNOT_FIND_ORDER = 'Cannot find order.'

export const fixPersonName = (string: string) => {
  return string
    ?.trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
    .join(' ')
}

export const fixThingName = (string: string) => {
  return string?.trim().replace(/\s+/g, ' ').toLowerCase()
}

export const fixText = (string: string) => {
  return string?.trim().replace(/\s+/g, ' ')
}

export const getFoodTypeByID = async (
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

export const getOrderByID = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  let orders

  try {
    orders = await Orders.findById(req.params.id)
    if (orders === null)
      return res.status(404).json({ message: MESSAGE_CANNOT_FIND_ORDER })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  res.orders = orders
  next()
}

export const getFoodByID = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  let foods
  try {
    foods = await Foods.findById(req.params.id)

    if (foods === null)
      return res.status(404).json({ message: MESSAGE_CANNOT_FIND_FOOD })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  res.foods = foods
  next()
}

export const getFoodsByIDs = async (req: any, res: any, next: NextFunction) => {
  let foods

  try {
    foods = await Foods.find({
      _id: {
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

export const getFoodTypesByIDs = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  let foodTypes
  try {
    foodTypes = await FoodTypes.find({
      _id: { $in: req.body.id || req.body._id }
    })
    if (foodTypes === null)
      return res.status(404).json({ message: MESSAGE_CANNOT_FIND_TYPE })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  res.foodTypes = foodTypes
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

import { Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import FoodTypes from '../models/foodtypes'
import Foods from '../models/foods'
import Orders from '../models/orders'
import Employees from '../models/employees'

const MESSAGE_CANNOT_FIND_TYPE = 'Cannot find food type.'
const MESSAGE_CANNOT_FIND_FOOD = 'Cannot find food.'
const MESSAGE_CANNOT_FIND_ORDER = 'Cannot find food type.'
const MESSAGE_CANNOT_FIND_EMPLOYEE = 'Cannot find employee.'

export async function getFoodTypeById(
  req: Request,
  res: any,
  next: NextFunction
) {
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

export async function getOrderById(req: Request, res: any, next: NextFunction) {
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

export async function getFoodTypeByName(
  req: any,
  res: any,
  next: NextFunction
) {
  let foodType

  try {
    if (req.params.type) {
      foodType = await FoodTypes.findOne({ type: req.params.type })
    } else {
      foodType = await FoodTypes.findOne({ type: req.body.type })
    }
    if (foodType === null)
      return res.status(404).json({ message: MESSAGE_CANNOT_FIND_TYPE })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  res.foodType = foodType
  next()
}

export async function getFood(req: Request, res: any, next: NextFunction) {
  let food
  try {
    food = await Foods.findById(req.params.id)

    if (food === null)
      return res.status(404).json({ message: MESSAGE_CANNOT_FIND_FOOD })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  res.food = food
  next()
}

export async function getFoodsByName(req: any, res: any, next: NextFunction) {
  let foods

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

export async function getEmployeeByEmailAndPassword(
  req: Request,
  res: any,
  next: NextFunction
) {
  let employee
  try {
    employee = await Employees.findOne({
      email: req.body.email,
      password: req.body.password
    })
    if (employee === null)
      return res.status(404).json({ message: MESSAGE_CANNOT_FIND_EMPLOYEE })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  res.employee = employee
  next()
}

// used only when employee is already found
export async function updateEmployeeLastSeen(
  req: Request,
  res: any,
  next: NextFunction
) {
  try {
    res.employee.last_seen = new Date()
    await res.employee.save({ validateBeforeSave: false })
  } catch (e: any) {
    return res.status(500).json(e)
  }
  next()
}

export async function getFoodTypesByTheirIDs(
  req: Request,
  res: any,
  next: NextFunction
) {
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

export async function cookieJwtAuthentication(
  req: any,
  res: any,
  next: NextFunction
) {
  const token = req.cookies.token
  try {
    const decoded = jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET))
    console.log('token verified')

    req.employee = decoded
    next()
  } catch (e: any) {
    res.clearCookie('token')
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

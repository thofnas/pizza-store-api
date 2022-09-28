import { Request, Response } from 'express'
import path from 'path'
import mongoose from 'mongoose'
import Foods from '../models/foods'
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'

import { s3, BUCKET_NAME } from '../index'
import { fixText, fixThingName } from '../middleware/middlewares'

const MESSAGE_DELETED = 'Deleted Successfully.'
const MESSAGE_WRONG_EXTENTION = 'Image extension should be .png.'
const TYPE_NOT_FOUND = 'Type not found.'

const resizeImageBuffer = async (buffer: string | Buffer) => {
  return await sharp(buffer)
    .resize({
      height: 512,
      width: 512,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer()
}

export async function getAllFoodController(req: Request, res: Response) {
  const { page = 1, limit = 20, types } = req.query
  let filter = {}

  if (types !== undefined) {
    filter = {
      ...filter,
      ...{
        type: {
          $in: types?.toString().split(',')
        }
      }
    }
  }

  try {
    const foods = await Foods.find(filter)
      .skip(Number(page) * Number(limit) - Number(limit))
      .limit(Number(limit))

    res.json(foods.length !== 0 ? foods : { message: 'No data.' })
  } catch (e: any) {
    return res.json({ message: e.message })
  }
}

export async function getOneFoodController(req: Request, res: any) {
  res.send(res.foods)
}

export async function createFoodController(req: Request, res: any) {
  const {
    name,
    description,
    calories,
    fat,
    carbs,
    proteins,
    sugar,
    salt,
    price
  } = req.body
  const image = req.file

  if (!image) return res.status(400).json('Image is required.')

  const buffer = await resizeImageBuffer(image.buffer)

  if (path.extname(image.originalname) !== '.png')
    return res.status(400).json({ message: MESSAGE_WRONG_EXTENTION })

  const objectId = new mongoose.Types.ObjectId()
  let fileName = ''
  if (image !== undefined) {
    fileName = `${objectId}.png`
  }

  const food = new Foods({
    _id: objectId,
    name: fixThingName(name),
    description: fixText(description),
    price,
    type: res.foodType._id,
    image_path: fileName,
    created_at: new Date(),
    last_update: new Date(),
    nutrition: {
      calories,
      fat,
      carbs,
      proteins,
      sugar,
      salt
    }
  })

  try {
    const newFood = await food.save()
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: req.file?.mimetype,
      ACL: 'public-read'
    })

    s3.send(command)
    res.status(201).json(newFood)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export async function patchFoodController(req: any, res: any) {
  const {
    name,
    description,
    cost,
    type,
    calories,
    fat,
    carbs,
    proteins,
    sugar,
    salt
  } = req.body
  const image = req.file

  if (image && path.extname(image.originalname) !== '.png')
    return res.status(400).json({ message: MESSAGE_WRONG_EXTENTION })

  res.foods.last_update = new Date()
  if (name !== undefined) res.foods.name = fixThingName(name)
  if (description !== undefined) res.foods.description = fixText(description)
  if (cost !== undefined) res.foods.cost = cost
  if (type !== undefined) res.foods.type = res.foodType._id
  if (calories !== undefined) res.foods.nutrition.calories = calories
  if (fat !== undefined) res.foods.nutrition.fat = fat
  if (carbs !== undefined) res.foods.nutrition.carbs = carbs
  if (proteins !== undefined) res.foods.nutrition.proteins = proteins
  if (sugar !== undefined) res.foods.nutrition.sugar = sugar
  if (salt !== undefined) res.foods.nutrition.salt = salt
  if (image !== undefined) {
    const fileName = `${res.foods._id}.png`
    const buffer = await resizeImageBuffer(req.file.buffer)
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    })
    s3.send(command)
  }
  try {
    const updatedFood = await res.foods.save()
    res.status(201).json(updatedFood)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export async function deleteFoodController(req: Request, res: any) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: res.foods.image_path
  })
  try {
    await s3.send(command)
    await res.foods.remove()
    res.json({ message: MESSAGE_DELETED })
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

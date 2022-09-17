import { Request, Response } from 'express'
import path from 'path'
import mongoose from 'mongoose'
import Foods from '../models/foods'
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'

import { s3, BUCKET_NAME } from '../index'
import { fixThingName } from '../middleware/middlewares'

const MESSAGE_DELETED = 'Deleted Successfully.'
const MESSAGE_WRONG_EXTENTION = 'Image extension should be .png.'

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
  const { page = 1, limit = 20 } = req.query

  try {
    const foods = await Foods.find()
      .skip(Number(page) * Number(limit) - Number(limit))
      .limit(Number(limit))
    res.json(foods)
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

export async function getOneFoodController(req: Request, res: any) {
  res.send(res.food)
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
    description: description,
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

  res.food.last_update = new Date()
  if (name !== undefined) res.food.name = fixThingName(name)
  if (description !== undefined) res.food.description = description
  if (cost !== undefined) res.food.cost = cost
  if (type !== undefined) res.food.type = res.foodType._id
  if (calories !== undefined) res.food.nutrition.calories = calories
  if (fat !== undefined) res.food.nutrition.fat = fat
  if (carbs !== undefined) res.food.nutrition.carbs = carbs
  if (proteins !== undefined) res.food.nutrition.proteins = proteins
  if (sugar !== undefined) res.food.nutrition.sugar = sugar
  if (salt !== undefined) res.food.nutrition.salt = salt
  if (image !== undefined) {
    const fileName = `${res.food._id}.png`
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
    const updatedFood = await res.food.save()
    res.status(201).json(updatedFood)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export async function deleteFoodController(req: Request, res: any) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: res.food.image_path
  })
  try {
    await s3.send(command)
    await res.food.remove()
    res.json({ message: MESSAGE_DELETED })
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}

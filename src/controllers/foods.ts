import { Request, Response } from 'express'
import path from 'path'
import mongoose from 'mongoose'
import Foods from '../models/foods'
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'

import { s3, BUCKET_NAME } from '../index'

const MESSAGE_DELETED = 'Deleted Successfully.'
const MESSAGE_WRONG_EXTENTION = 'Image extension should be .png'

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
  const image = req.file || undefined
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
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read'
    })

    s3.send(command)
    res.status(201).json(newFood)
  } catch (e: any) {
    res.status(400).json({ message: e.message })
  }
}

export async function patchFoodController(req: any, res: any) {
  const { name, title, cost, type, calories, fat, sugar, salt } = req.body
  const image = req.file || undefined

  if (path.extname(image.originalname) !== '.png')
    return res.status(400).json({ message: MESSAGE_WRONG_EXTENTION })

  res.food.last_update = new Date()
  if (name !== null || title !== null) res.food.name = name || title
  if (cost !== null) res.food.cost = cost
  if (type !== null) res.food.type = res.foodType._id
  if (calories !== null) res.food.nutritions.calories = calories
  if (fat !== null) res.food.nutritions.fat = fat
  if (sugar !== null) res.food.nutritions.sugar = sugar
  if (salt !== null) res.food.nutritions.salt = salt
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

require('dotenv').config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import mongoose from 'mongoose'
import { S3Client } from '@aws-sdk/client-s3'

import foodsRoute from './routes/foods'
import foodTypesRouter from './routes/foodtypes'
import authRouter from './routes/auth'
import OrdersRouter from './routes/orders'
import Employees from './models/employees'

const app = express()

// test commit 

const BUCKET_NAME = process.env.BUCKET_NAME || ''
const BUCKET_REGION = process.env.BUCKET_REGION || ''
const ACCESS_KEY = process.env.ACCESS_KEY || ''
const ACCESS_KEY_SECRET = process.env.ACCESS_KEY_SECRET || ''
const PORT = process.env.PORT || 8080
const DATABASE_URL: string =
  process.env.DATABASE_URL || 'mongodb://localhost/pizza-store'

const s3 = new S3Client({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: ACCESS_KEY_SECRET
  },
  region: BUCKET_REGION
})
const db = mongoose.connection

mongoose.connect(DATABASE_URL)

db.on('error', (error) => console.log(error))
db.once('open', () => {
  // create an account on first launch
  mongoose.connection.db.listCollections().toArray((err, collectionNames) => {
    if (err) {
      console.log(err)
      return
    }

    if (
      collectionNames?.find((employee) => employee.name === 'employees') ===
      undefined
    ) {
      new Employees({
        name: { first: 'Moderator' },
        email: 'admin@a',
        password: 'admin@a'
      }).save({ validateBeforeSave: false })
    }
  })
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use('/foods', foodsRoute)
app.use('/foodtypes', foodTypesRouter)
app.use('/auth', authRouter)
app.use('/orders', OrdersRouter)

app.listen(PORT, () => {
  console.log('Server Running On Port ' + PORT)
})

export { s3, BUCKET_NAME }

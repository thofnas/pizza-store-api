import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const FoodTypesSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  created_at: { type: Date, default: Date.now, required: true },
  last_update: { type: Date, default: Date.now, required: true }
}).plugin(uniqueValidator, { message: '{VALUE} already exists.' })

const FoodTypes = mongoose.model('FoodTypes', FoodTypesSchema)
export default FoodTypes

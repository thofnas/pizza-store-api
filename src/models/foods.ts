import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const NutritionSchema = new Schema({
  calories: { type: Number, required: true },
  fat: { type: Number, required: true },
  carbs: { type: Number, required: true },
  proteins: { type: Number, required: true },
  sugar: { type: Number, required: true },
  salt: { type: Number, required: true }
})

const FoodsSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  price: { type: Number, required: true, min: [0.1, 'Number is too low.'] },
  type: { type: Schema.Types.ObjectId, ref: 'FoodTypes', required: true },
  image_path: { type: String, required: true, unique: true },
  nutrition: NutritionSchema,
  created_at: { type: Date, default: Date.now, required: true },
  last_update: { type: Date, default: Date.now, required: true }
}).plugin(uniqueValidator, { message: '{VALUE} already exists.' })

const Foods = mongoose.model('Foods', FoodsSchema)
export default Foods

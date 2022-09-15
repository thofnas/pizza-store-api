import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const NutritionsSchema = new Schema({
  calories: { type: Number, required: true },
  fat: { type: Number, required: true },
  sugar: { type: Number, required: true },
  salt: { type: Number, required: true }
})

const FoodsSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true, min: [0.1, 'Number is too low.'] },
  type: { type: Schema.Types.ObjectId, ref: 'FoodTypes', required: true },
  image_path: { type: String, required: true, unique: true },
  nutritions: NutritionsSchema,

  created_at: { type: Date, default: Date.now, required: true },
  last_update: { type: Date, default: Date.now, required: true }
  //updated_by: { type: Schema.Types.ObjectId, ref: 'Employees', required: true },
  //created_by: { type: Schema.Types.ObjectId, ref: 'Employees', required: true }
}).plugin(uniqueValidator, { message: '{VALUE} already exists.' })

const Foods = mongoose.model('Foods', FoodsSchema)
export default Foods

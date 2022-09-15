import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const ROLES = ['common', 'moderator', 'employeer', 'seo']
const DEFAULT_ROLE = 'common'
const NAME_SURNAME_LENGTH = { min: 2, max: 30 }

const EmployeesSchema = new Schema({
  name: {
    first: {
      type: String,
      required: true,
      minLength: [NAME_SURNAME_LENGTH.min, 'Name is too short.'],
      maxLength: [NAME_SURNAME_LENGTH.max, 'Name is too long.']
    },
    last: {
      type: String,
      required: true,
      minLength: [NAME_SURNAME_LENGTH.min, 'Surname is too short.'],
      maxLength: [NAME_SURNAME_LENGTH.max, 'Surname is too long.']
    }
  },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  role: { type: String, required: true, default: DEFAULT_ROLE, enum: ROLES },
  home_address: { type: String, required: true },
  created_at: { type: Date, default: Date.now, required: true },
  //created_by: { type: Schema.Types.ObjectId, ref: 'Employees', required: true },
  updated_at: { type: Date, default: Date.now, required: true },
  //updated_by: { type: Schema.Types.ObjectId, ref: 'Employees', required: true },
  last_seen: { type: Date, default: Date.now }
}).plugin(uniqueValidator, { message: 'This {TYPE} is taken.' })

const Employees = mongoose.model('employees', EmployeesSchema)
export default Employees

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ORDER_STATUSES = ['pending', 'in_progress', 'completed', 'cancelled']

const OrdersSchema = new Schema({
  order_status: {
    type: String,
    default: ORDER_STATUSES[0],
    required: true,
    enum: ORDER_STATUSES
  },
  foods: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'Foods', required: true },
      name: { type: String, required: true },
      // typeId: { type: Schema.Types.ObjectId, ref: 'FoodTypes', required: true },
      image_path: { type: String, required: true },
      price: { type: Number, required: true }
    }
  ],
  order_price: { type: Number, required: true },
  customer_name: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  email: { type: String, required: false },
  created_at: { type: Date, default: Date.now, required: true }
})

const Orders = mongoose.model('Orders', OrdersSchema)
export default Orders

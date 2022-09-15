import jwt from 'jsonwebtoken'
import Employees from '../models/employees'

export async function signInController(req: any, res: any) {
  if (res.employee === null) {
    return res.json({
      message: 'Sign in failed'
    })
  }

  delete res.employee.password

  const token = jwt.sign(
    {
      id: res.employee.id,
      name: res.employee.name
    },
    String(process.env.ACCESS_TOKEN_SECRET),
    { expiresIn: '1h', algorithm: 'HS256' }
  )

  res.cookie('token', token, { httpOnly: true })
  return res.json({ message: 'Sign in successful', token })
}

export async function signUpController(req: any, res: any) {
  const { name, first, last, email, password, phone, home_address } = req.body
  const newEmployee = new Employees({
    name: name || {
      first: first,
      last: last
    },
    email: email,
    password: password,
    phone: phone,
    home_address: home_address,
    created_at: Date.now(),
    updated_at: Date.now()
  })

  try {
    const employee = await newEmployee.save()
    res.status(201).json(employee)
  } catch (error) {
    res.status(500).json(error)
  }
}

export async function signOutController(req: any, res: any) {
  res.clearCookie('token')
  return res.json({ message: 'Log out successful' })
}

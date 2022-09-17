import jwt from 'jsonwebtoken'

const ADMIN_LOGIN = process.env.ADMIN_LOGIN || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin'

export const signInController = async (req: any, res: any) => {
  if (
    req.body.login !== ADMIN_LOGIN.toLowerCase() &&
    req.body.password !== ADMIN_PASSWORD
  ) {
    return res.json({
      message: 'Sign in failed'
    })
  }

  const token = jwt.sign(
    {
      login: ADMIN_LOGIN.toLowerCase()
    },
    String(process.env.ACCESS_TOKEN_SECRET),
    { expiresIn: '1h', algorithm: 'HS256' }
  )

  res.cookie('token', token, { httpOnly: true })
  return res.json({ message: 'Sign in successful', token })
}

export const signOutController = async (req: any, res: any) => {
  res.clearCookie('token')
  return res.json({ message: 'Log out successful' })
}

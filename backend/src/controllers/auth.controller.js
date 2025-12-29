import User from "../models/user.model.js"
import { hashPassword, comparePassword } from "../utils/hash.js"
import { generateToken } from "../utils/token.js"

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Invalid email format" })
}

if (password.length < 8) {
  return res.status(400).json({ message: "Password too weak" })
}

  const hashed = await hashPassword(password)
  const user = await User.create({ fullName, email, password: hashed })
  res.status(201).json({ token: generateToken(user) })
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) return res.status(401).json({ message: "Invalid credentials" })

  const match = await comparePassword(password, user.password)
  if (!match) return res.status(401).json({ message: "Invalid credentials" })

  user.lastLogin = new Date()
  await user.save()

  res.json({ token: generateToken(user) })
}

export const me = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password")
  res.json(user)
}

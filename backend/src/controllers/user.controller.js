import User from "../models/user.model.js"
import { hashPassword, comparePassword } from "../utils/hash.js"

export const getUsers = async (req, res) => {
  const page = Number(req.query.page || 1)
  const limit = 10
  const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .select("-password")

  const total = await User.countDocuments()
  res.json({ users, total })
}


export const updateStatus = async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  await User.findByIdAndUpdate(id, { status })
  res.json({ success: true })
}

export const updateProfile = async (req, res) => {
  const { fullName, email } = req.body
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { fullName, email },
    { new: true }
  ).select("-password")
  res.json(user)
}

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  const user = await User.findById(req.user.id)

  const match = await comparePassword(oldPassword, user.password)
  if (!match) return res.status(400).json({ message: "Wrong password" })

  user.password = await hashPassword(newPassword)
  await user.save()

  res.json({ success: true })
}
import { useEffect, useState } from "react"
import api from "../api/axios"
import Toast from "../components/Toast"
import Spinner from "../components/Spinner"

export default function Profile() {
  const [data, setData] = useState(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [toast, setToast] = useState("")
  const [type, setType] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get("/auth/me").then(res => {
      setData(res.data)
      setFullName(res.data.fullName)
      setEmail(res.data.email)
    })
  }, [])

  if (!data) return <Spinner />

  const saveProfile = async () => {
    setLoading(true)
    try {
      await api.put("/users/me", { fullName, email })
      setToast("Profile updated successfully")
      setType("success")
    } catch {
      setToast("Failed to update profile")
      setType("error")
    }
    setLoading(false)
  }

  const changePassword = async () => {
    if (newPassword.length < 8) {
      setToast("Password too weak")
      setType("error")
      return
    }

    setLoading(true)
    try {
      await api.put("/users/me/password", { oldPassword, newPassword })
      setToast("Password changed successfully")
      setType("success")
      setOldPassword("")
      setNewPassword("")
    } catch {
      setToast("Password change failed")
      setType("error")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white p-6 rounded shadow space-y-6">
      <Toast
  message={toast}
  type={type}
  onClose={() => setToast("")}
/>


      <div>
        <h2 className="text-lg font-semibold mb-2">Profile Information</h2>
        <input
          className="w-full border p-2 rounded mb-2"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            onClick={saveProfile}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Save
          </button>
          <button
            onClick={() => {
              setFullName(data.fullName)
              setEmail(data.email)
            }}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Change Password</h2>
        <input
          type="password"
          placeholder="Current Password"
          className="w-full border p-2 rounded mb-2"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full border p-2 rounded mb-3"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <button
          onClick={changePassword}
          className="bg-red-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Change Password
        </button>
      </div>

      {loading && <Spinner />}
    </div>
  )
}

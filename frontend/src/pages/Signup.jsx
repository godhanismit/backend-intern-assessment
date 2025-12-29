import { useState } from "react"
import api from "../api/axios"
import Spinner from "../components/Spinner"
import Toast from "../components/Toast"

export default function Signup() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState("")
  const [type, setType] = useState("")

  const submit = async e => {
    e.preventDefault()

    if (!fullName || !email || !password || !confirm) {
      setToast("All fields are required")
      setType("error")
      return
    }

    if (!email.includes("@")) {
      setToast("Invalid email format")
      setType("error")
      return
    }

    if (password.length < 8) {
      setToast("Password must be at least 8 characters")
      setType("error")
      return
    }

    if (password !== confirm) {
      setToast("Passwords do not match")
      setType("error")
      return
    }

    setLoading(true)
    try {
      await api.post("/auth/signup", { fullName, email, password })
      setToast("Account created successfully")
      setType("success")
      setTimeout(() => (location.href = "/login"), 800)
    } catch {
      setToast("Signup failed")
      setType("error")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toast
  message={toast}
  type={type}
  onClose={() => setToast("")}
/>


      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md p-6 rounded shadow space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Signup</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Full Name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Confirm Password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create Account
        </button>

        {loading && <Spinner />}

        <p className="text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </form>
    </div>
  )
}

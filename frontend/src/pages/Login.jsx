import { useState } from "react"
import api from "../api/axios"
import Spinner from "../components/Spinner"
import Toast from "../components/Toast"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState("")
  const [type, setType] = useState("")

  const submit = async e => {
    e.preventDefault()
    if (!email || !password) {
      setToast("All fields are required")
      setType("error")
      return
    }

    setLoading(true)
    try {
      const res = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", res.data.token)
      setToast("Login successful")
      setType("success")
      setTimeout(() => (location.href = "/"), 800)
    } catch {
      setToast("Invalid email or password")
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
        className="bg-white w-full max-w-sm p-6 rounded shadow space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

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

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        {loading && <Spinner />}

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600">
            Signup
          </a>
        </p>
      </form>
    </div>
  )
}

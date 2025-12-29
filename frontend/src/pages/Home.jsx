import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Home() {
  const { user } = useContext(AuthContext)

  if (!user) return null

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4 bg-gray-50">
      <div className="bg-white p-8 rounded shadow max-w-lg w-full text-center space-y-4">
        <h1 className="text-2xl font-semibold">
          Welcome to User Management System
        </h1>

        <p className="text-gray-600">
          Hello <span className="font-medium">{user.fullName}</span>
        </p>

        {user.role === "admin" ? (
          <p className="text-gray-700">
            You are logged in as an <span className="font-semibold">Admin</span>.
            You can manage users, activate or deactivate accounts, and monitor
            system activity.
          </p>
        ) : (
          <p className="text-gray-700">
            You are logged in as a <span className="font-semibold">User</span>.
            You can view and update your profile and manage your account
            securely.
          </p>
        )}
      </div>
    </div>
  )
}

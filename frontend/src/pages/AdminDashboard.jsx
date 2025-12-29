import { useEffect, useState } from "react"
import api from "../api/axios"
import Modal from "../components/Modal"
import Toast from "../components/Toast"
import Spinner from "../components/Spinner"

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState("")
  const [type, setType] = useState("")
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)

  const fetchUsers = () => {
    setLoading(true)
    api.get(`/users?page=${page}`).then(res => {
      setUsers(res.data.users)
      setTotal(res.data.total)
      setLoading(false)
    })
  }

  useEffect(fetchUsers, [page])

  const updateStatus = () => {
    setUpdating(true)
    api
      .patch(`/users/${modal.id}/status`, { status: modal.status })
      .then(() => {
        setToast("User status updated")
        setType("success")
        setModal(null)
        fetchUsers()
      })
      .finally(() => setUpdating(false))
  }

  const pages = Math.ceil(total / 10)

  return (
    <div className="p-4 sm:p-6">
      <Toast message={toast} type={type} onClose={() => setToast("")} />

      <Modal
        open={!!modal}
        text="Are you sure?"
        onClose={() => setModal(null)}
        onConfirm={updateStatus}
      />

      <h2 className="text-xl font-semibold mb-4">Users</h2>

      {loading ? (
        <Spinner />
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Email</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="text-center">
                  <td className="border p-2 whitespace-nowrap">{u.email}</td>
                  <td className="border p-2">{u.fullName}</td>
                  <td className="border p-2 capitalize">{u.role}</td>
                  <td className="border p-2 capitalize">{u.status}</td>
                  <td className="border p-2">
                    {u.status === "inactive" && (
                      <button
                        disabled={updating}
                        onClick={() =>
                          setModal({ id: u._id, status: "active" })
                        }
                        className="bg-green-600 disabled:opacity-50 text-white px-3 py-1 rounded"
                      >
                        Activate
                      </button>
                    )}

                    {u.status === "active" && (
                      <button
                        disabled={updating}
                        onClick={() =>
                          setModal({ id: u._id, status: "inactive" })
                        }
                        className="bg-red-600 disabled:opacity-50 text-white px-3 py-1 rounded"
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

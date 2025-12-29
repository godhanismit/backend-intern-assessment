import { useEffect } from "react"

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => onClose(), 2500)
    return () => clearTimeout(timer)
  }, [message])

  if (!message) return null

  const color =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500"

  return (
    <div
      className={`${color} text-white px-4 py-2 rounded fixed top-5 right-5 z-50`}
    >
      {message}
    </div>
  )
}

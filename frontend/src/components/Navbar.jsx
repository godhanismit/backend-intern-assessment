import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    location.href = "/login";
  };

  if (!user) return null;

  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full bg-gray-800 w-10 h-10 text-white font-semibold">
            {(user.fullName || user.email || "?").charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="font-semibold leading-tight">
              {user.fullName || "User"}
            </p>
            <p className="text-xs text-gray-400 capitalize">{user.role}</p>
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <nav className="hidden sm:flex items-center gap-3 text-sm">
          <a href="/" className="px-3 py-1 rounded hover:bg-gray-800">
            Home
          </a>

          {user.role === "admin" && (
            <a href="/admin" className="px-3 py-1 rounded hover:bg-gray-800">
              Admin
            </a>
          )}

          <a href="/profile" className="px-3 py-1 rounded hover:bg-gray-800">
            Profile
          </a>

          <button
            onClick={logout}
            className="px-3 py-1 rounded bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </nav>
      </div>

      {open && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          <a
            href="/"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Home
          </a>

          {user.role === "admin" && (
            <a
              href="/admin"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded hover:bg-gray-800"
            >
              Admin
            </a>
          )}

          <a
            href="/profile"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded hover:bg-gray-800"
          >
            Profile
          </a>

          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 rounded bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

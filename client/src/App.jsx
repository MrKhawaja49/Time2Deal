import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom"
import { Sidebar } from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import ExpiredMedicines from "./pages/ExpiredMedicines"
import Discounts from "./pages/Discounts"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { isAuthenticated } from "./utils/auth"
import { Toaster } from "@/components/ui/toaster"

function App() {
  const [auth, setAuth] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      setAuth(isAuthenticated())
    }

    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  return (
    <Router>
      <AppContent auth={auth} setAuth={setAuth} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Toaster />
    </Router>
  )
}

function AppContent({ auth, setAuth, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth) {
      navigate("/login")
    }
  }, [auth, navigate])

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {auth && <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} setAuth={setAuth} />}
      <div className={`flex-1 ${auth ? "lg:ml-64" : ""} transition-all duration-200 ease-in-out`}>
        <Routes>
          <Route path="/login" element={auth ? <Navigate to="/" replace /> : <Login setAuth={setAuth} />} />
          <Route path="/signup" element={auth ? <Navigate to="/" replace /> : <Signup />} />
          <Route
            path="/"
            element={
              auth ? (
                <Dashboard sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/expired-medicines" element={auth ? <ExpiredMedicines /> : <Navigate to="/login" replace />} />
          <Route path="/discounts" element={auth ? <Discounts /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App


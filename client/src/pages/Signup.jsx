import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const signup = (name, email, password) => {
    // Placeholder for signup logic.  In a real application, this would
    // interact with a backend service.
    if (name && email && password) {
      return true // Simulate successful signup
    } else {
      return false // Simulate signup failure
    }
  }

  const handleSignup = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords don't match!")
      return
    }
    if (signup(name, email, password)) {
      navigate("/login")
    } else {
      setError("Signup failed. Please try again.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-full max-w-md px-6 py-8">
        <Card className="w-full backdrop-blur-md bg-white/30">
          <CardContent>
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-center text-white">Sign up</h1>
            </div>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white/80 text-black"
                />
              </div>
              <div className="mb-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/80 text-black"
                />
              </div>
              <div className="mb-4">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/80 text-black"
                />
              </div>
              <div className="mb-4">
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/80 text-black"
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white mt-4">
                Sign up
              </Button>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-4 text-sm text-center text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-200 hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
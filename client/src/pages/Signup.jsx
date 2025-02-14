import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signup } from '@/utils/auth'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords don't match!")
      return
    }
    if (signup(name, email, password)) {
      navigate('/login')
    } else {
      setError('Signup failed. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-full max-w-md px-6 py-8">
        <Card className="w-full backdrop-blur-md bg-white/30">
          <CardHeader>
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold text-center text-white">Create Account</CardTitle>
            <p className="text-center text-gray-200 mt-2">Join Time2Deal today</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="name"
                    placeholder="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white/50 border-white/50 text-gray-800 placeholder-gray-500"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/50 border-white/50 text-gray-800 placeholder-gray-500"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/50 border-white/50 text-gray-800 placeholder-gray-500"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="bg-white/50 border-white/50 text-gray-800 placeholder-gray-500"
                  />
                </div>
              </div>
            </form>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleSignup}>Sign up</Button>
            <p className="mt-4 text-sm text-center text-white">
              Already have an account? <Link to="/login" className="text-blue-200 hover:underline">Log in</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
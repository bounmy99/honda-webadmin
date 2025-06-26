'use client'
import { useState } from 'react'
import InputField from './InputField'
import LoginButton from './LoginButton'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const router = useRouter()
  
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
   
    if (formData.username === 'admin' && formData.password === 'admin') {
      console.log('Login successful')
      
 
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('username', formData.username)
      localStorage.setItem('loginTime', new Date().getTime().toString())
      
      router.push('/Dashboard')
    } else {
      alert('Username or password is invalid')
    }
  }
  
  return (
    <div className="w-1/2 bg-gray-200 flex items-center justify-center">
      <div className="w-80">
        <h2 className="text-5xl font-bold text-black mb-16 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <InputField
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(value) => handleInputChange('username', value)}
            icon="user"
          />
          <InputField
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
            icon="lock"
          />
          <div className="flex items-center justify-between py-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-2 border-gray-400 mr-3"
              />
              <span className="text-gray-700 font-semibold">
                Remember
              </span>
            </label>
            <a
              href="#"
              className="text-base text-black hover:text-gray-600 font-semibold">
              Forgot Password?
            </a>
          </div>
          <div className="pt-4">
            <LoginButton />
          </div>
        </form>
      </div>
    </div>
  )
}
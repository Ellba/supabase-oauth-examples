import { useState } from 'react'
import './App.css'
import { AuthProvider } from './components/auth/AuthContext'
import Auth from './components/auth/Auth'

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Auth />
      </div>
    </AuthProvider>
  )
}

export default App

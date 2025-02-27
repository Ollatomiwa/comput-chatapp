import {Routes, Route, Navigate} from "react-router-dom"

import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SettingPage from "./pages/SettingPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import ProfilePage from "../ProfilePage"

import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth()
  },[checkAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
    <Loader className="size-10 animate-spin"/>
    </div>
  )
  
  return (
    <div>
      <Navbar />
      <Routes>
        
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to= "/login" />}/>   {/* if user is not auth redirect to homepage  */}
        <Route path="/settings" element={<SettingPage />}/>
        <Route path="/login" element={!authUser ?<LoginPage /> : <Navigate to= "/" />}/>  {/*  if user is auth redirect to homepage  */}
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to= "/" /> }/>
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to= "/login" />}/>

      </Routes>
        <Toaster/>
    </div>
  )
}

export default App